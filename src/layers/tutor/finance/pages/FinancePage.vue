<template>
  <div class="card">
    <Chart type="line" :data="chartData" :options="chartOptions" />
  </div>
</template>

<script setup lang="ts">
import { useQuery } from "@tanstack/vue-query";
import Chart from "primevue/chart";
import { ref, onMounted, watchEffect, watch, type Ref, nextTick } from "vue";
import { financeService } from "../financeService";
import type { Graph } from "../FinanceTypes";
import { useCssVar, useDark } from "@vueuse/core";


const { data } = useQuery<Graph>({ queryKey: ['graph'], queryFn: financeService.getGraph })
watchEffect(() => console.log(data.value));
onMounted(() => {
  chartOptions.value = setChartOptions();
});

watch(data, () => {
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

const setChartData = (data: Ref<Graph>) => {
  // const borderColor = useCssVar('--ui-cian-400', document.documentElement)
  return {
    labels: data?.value?.labels,
    datasets: [
      {
        label: 'Длительность',
        data: JSON.parse(JSON.stringify(data?.value?.datasets[2].data)),
        fill: false,
        // borderColor: borderColor.value,
        tension: 0.4,
        yAxisID: 'y',
      },
      {
        label: 'Прибыль',
        data: JSON.parse(JSON.stringify(data?.value?.datasets[0].data)),
        fill: false,
        // borderColor: borderColor.value,
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
      // y: {
      //   ticks: {
      //     color: textColorSecondary.value
      //   },
      //   grid: {
      //     color: textColorSecondary.value,
      //     display: false
      //   }
      // },
      y: {
        type: 'linear',
        display: true,
        position: 'left',
        ticks: {
          color: textColorSecondary.value
        },
        min:0
      },
      y1: {
        type: 'linear',
        display: true,
        position: 'right',
        ticks: {
          color: textColorSecondary.value
        },
        grid: {
          // drawOnChartArea: false, // only want the grid lines for one axis to show up
          color: textColorSecondary.value,
          display: false
        },
        min:0
      },
    }
  };
}
</script>
