import { useQuery, useMutation, useQueryClient, QueryFunction, MutationFunction } from 'react-query'

// Custom hook for managing queries and mutations
export function useRequestProcessor() {
  const queryClient = useQueryClient()

  // Custom hook for managing queries
  function useQueryHook(key: string, queryFunction: QueryFunction, options = {}) {
    return useQuery({
      queryKey: key,
      queryFn: queryFunction,
      onSettled: () => queryClient.invalidateQueries(key),
      ...options
    })
  }

  // Custom hook for managing mutations
  function useMutateHook(key: string, mutationFunction: MutationFunction, options = {}) {
    return useMutation({
      mutationKey: key,
      mutationFn: mutationFunction,
      onSettled: () => queryClient.invalidateQueries(key),
      ...options
    })
  }

  // Return the custom hooks
  return { useQuery: useQueryHook, useMutation: useMutateHook }
}
