<template>
  <FloatLabel>
    <TreeSelect v-model="model" loadingMode="icon" :options="nodes2" @node-expand="onNodeExpand2" fluid showClear
      name="studentId" />
    <label for="studentId">Группа</label>
  </FloatLabel>
</template>

<script setup lang="ts">
import { FloatLabel, TreeSelect } from 'primevue';
import type { TreeNode } from 'primevue/treenode';
import { ref, onMounted } from 'vue';

type Node = {
  key: string,
  label: string,
  leaf: boolean,
  loading: boolean
}

const model = defineModel()
const nodes2 = ref<Node[] | undefined>(undefined);
const loading = ref(false);

onMounted(() => {
  loading.value = true;
  nodes2.value = initiateNodes2();

  setTimeout(() => {
    loading.value = false;
    nodes2?.value?.map((node) => (node.loading = false));
  }, 2000);
});



const onNodeExpand2 = (node: TreeNode) => {
  if (!node.children) {
    node.loading = true;

    setTimeout(() => {
      const _node = { ...node };

      _node.children = [];

      for (let i = 0; i < 3; i++) {
        _node.children.push({
          key: node.key + '-' + i,
          icon: 'pi pi-fw pi-user',
          selectable:false,
          label: 'Lazy ' + node.label + '-' + i
        });
      }
      node.children = _node.children
      node.loading = false
    }, 500);
  }
};

const initiateNodes2 = () => {
  return [
    {
      key: '0',
      label: 'Группа 1',
      leaf: false,
      icon: 'pi pi-fw pi-users',
      loading: true
    },
    {
      key: '1',
      label: 'Группа 2',
      leaf: false,
      icon: 'pi pi-fw pi-users',
      loading: true
    },
    {
      key: '2',
      label: 'Группа 3',
      leaf: false,
      icon: 'pi pi-fw pi-users',
      loading: true
    }
  ];
};
</script>
