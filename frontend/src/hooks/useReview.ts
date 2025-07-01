import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ReviewType } from "../types/Review";
import { axiosInstance } from "../services/apiClient";

export const useGetRiviews = (id: string) => {
  return useQuery<ReviewType[], Error>({
    queryKey: ["reviews", id],
    queryFn: () =>
      axiosInstance
        .get<ReviewType[]>(`store/products/${id}/reviews/`)
        .then((res) => res.data),
    staleTime: 60 * 60 * 1000,
  });
};

export const useCreateReview = (id: string, data: ReviewType) => {
  // Get the QueryClient instance
  const queryClient = useQueryClient();

  return useMutation<ReviewType, Error, ReviewType>({
    mutationFn: () =>
      axiosInstance
        .post<ReviewType>(`store/products/${id}/reviews/`, data)
        .then((res) => res.data),
    onSuccess: (newReview) => {
      // Update the cache data for the reviews query
      queryClient.setQueryData<ReviewType[]>(["reviews", id], (oldReviews) => {
        return oldReviews ? [...oldReviews, newReview] : [newReview];
      });
    },
  });
};
