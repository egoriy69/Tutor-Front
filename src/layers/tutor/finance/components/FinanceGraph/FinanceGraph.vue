<template>
  <div :class="$style.wrapper">
    <div :class="$style.menu">
      <GraphTypeSelect v-model="type" />
      <RangeDatePicker v-model="range" />
    </div>
    <Chart type="line" :data="chartData" :options="chartOptions" :class="$style.chart" />
  </div>
</template>

<script setup lang="ts">
import { useQuery } from "@tanstack/vue-query";
import Chart from "primevue/chart";
import { ref, onMounted, watch, type Ref, nextTick } from "vue";
import { financeService } from "../../financeService";
import type { Graph } from "../../FinanceTypes";
import { useCssVar, useDark } from "@vueuse/core";
import GraphTypeSelect from "./GraphTypeSelect.vue";
import RangeDatePicker from "./RangeDatePicker.vue";

const type = ref('date')
const range = ref([])

const { data } = useQuery<Graph>({ queryKey: ['graph', type, range], queryFn: () => financeService.getGraph(type.value, range.value[0], range.value[1]) })
const trigger = ref(false)
onMounted(() => {
  chartOptions.value = setChartOptions();
  chartData.value = setChartData();
  trigger.value = !trigger.value
});

watch([data, trigger], () => {
  if (data.value) {
    chartData.value = setChartData(data);
  }
})
const isDark = useDark()
watch(isDark, async () => {
  await nextTick();
  chartOptions.value = setChartOptions();
});

const chartData = ref();
const chartOptions = ref();

const setChartData = (data?: Ref<Graph>) => {
  const durationColor = useCssVar('--ui-primary-color', document.documentElement)
  const profitColor = useCssVar('--ui-amber-400', document.documentElement)
  const grossColor = useCssVar('--ui-violet-400', document.documentElement)
  return {
    labels: data?.value?.labels,
    datasets: [
      {
        label: 'Длительность',
        data: data ? JSON.parse(JSON.stringify(data?.value?.datasets[2].data)) : null,
        fill: false,
        borderColor: durationColor.value,
        tension: 0.4,
        yAxisID: 'y',
      },
      {
        label: 'Прибыль',
        data: data ? JSON.parse(JSON.stringify(data?.value?.datasets[0].data)) : null,
        fill: false,
        borderColor: profitColor.value,
        tension: 0.4,
        yAxisID: 'y1',
      },
      {
        label: 'Доход',
        data: data ? JSON.parse(JSON.stringify(data?.value?.datasets[1].data)) : null,
        fill: false,
        borderColor: grossColor.value,
        tension: 0.4,
        yAxisID: 'y1',
      }
    ]
  };
};
const setChartOptions = () => {
  // const documentStyle = getComputedStyle(document.documentElement);
  const textColor = useCssVar('--main-text', document.documentElement);
  const textColorSecondary = useCssVar('--gray-text', document.documentElement);

  return {
    maintainAspectRatio: false,
    aspectRatio: 0.6,
    plugins: {
      legend: {
        labels: {
          color: textColor.value
        }
      }
    },
    scales: {
      x: {
        ticks: {
          color: textColorSecondary.value
        },
        grid: {
          color: textColorSecondary.value,
          display: false
        }

      },
      y: {
        type: 'linear',
        display: true,
        position: 'left',
        ticks: {
          color: textColorSecondary.value
        },
      },
      y1: {
        type: 'linear',
        display: true,
        position: 'right',
        ticks: {
          color: textColorSecondary.value
        },
        grid: {
          drawOnChartArea: false,
          color: textColorSecondary.value,
          display: false
        },
        min: 0
      },
    }
  };
}
</script>

<style lang="css" module>
.wrapper {
  max-width: 800px;
  height: 400px;
  padding-top: 20px;


}

.chart {
  height: 100%;
}
.menu{
  display: flex;
  gap: 20px;
}
</style>
