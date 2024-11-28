<template>
  <div :class="$style.container">
    <div style="display: flex; gap: 20px;margin-bottom: 20px;">
      <FinanceGraph />
      <CategoryTable />
    </div>
    <TransactionsTable />
  </div>
</template>

<script setup lang="ts">
import CategoryTable from '../components/CategoryTable/CategoryTable.vue';
import FinanceGraph from '../components/FinanceGraph/FinanceGraph.vue';
import TransactionsTable from '../components/Transactions/TransactionsTable.vue';

</script>
<style module>
.container {

  padding: 20px 0 40px;
}
</style>
