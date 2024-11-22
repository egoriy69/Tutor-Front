import { watch, type Ref } from 'vue';
import { useQuery, type DefaultError, type UseQueryOptions, type UseQueryReturnType } from '@tanstack/vue-query';



export function useAutoQuery<TData>(
  ref: Ref<TData>,
  options: UseQueryOptions<TData>
): UseQueryReturnType<TData, DefaultError> {
  // Reactive reference for storing the query data
  const data = ref
  // Initialize the useQuery hook with the provided key, function, and options
  const queryResult = useQuery<TData>(options);
  watch(queryResult.data, (newData) => {
    if (newData) {
      data.value = {
        ...data.value,
        ...newData,
      };
    }
  },
    { immediate: true });
  // Watch for changes in query data and update dataRef
  return queryResult;
}
