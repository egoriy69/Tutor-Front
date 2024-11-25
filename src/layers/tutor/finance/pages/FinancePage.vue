<template>
  <div class="card">
    <Chart type="line" :data="chartData" :options="chartOptions" />
  </div>
</template>

<script setup lang="ts">
import { useQuery } from "@tanstack/vue-query";
import Chart from "primevue/chart";
import { ref, onMounted, watchEffect, watch, type Ref } from "vue";
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
watch(isDark, () => {
  chartOptions.value = setChartOptions();
})

const chartData = ref();
const chartOptions = ref();

const setChartData = (data: Ref<Graph>) => {
  const borderColor = useCssVar('--ui-cian-400', document.documentElement)
  return {
    labels: data?.value?.labels,
    datasets: [
      {
        label: 'Длительность',
        data: JSON.parse(JSON.stringify(data?.value?.datasets[2].data)),
        fill: false,
        borderColor: borderColor.value,
        tension: 0.4
      }
    ]
  };
};
const setChartOptions = () => {
  // const documentStyle = getComputedStyle(document.documentElement);
  const textColor = useCssVar('--main-text', document.documentElement);
  console.log(textColor.value)
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
        ticks: {
          color: textColorSecondary.value
        },
        grid: {
          color: textColorSecondary.value,
          display: false
        }
      }
    }
  };
}
</script>
