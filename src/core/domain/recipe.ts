import type { Ingredient } from "@/core/domain/ingredient";
import type { Step } from '@/core/domain/step';

export interface Recipe {
  ingredients: Ingredient[]
  steps: Step[]
}
