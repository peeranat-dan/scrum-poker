import {
  columnSizingFeature,
  columnVisibilityFeature,
  rowSelectionFeature,
  tableFeatures,
} from '@tanstack/react-table';

export const features = tableFeatures({
  columnSizingFeature,
  columnVisibilityFeature,
  rowSelectionFeature,
});
