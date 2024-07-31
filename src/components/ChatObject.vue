<script setup lang="ts">
import type { ChatObjectDto } from '../apis/dtos';
const props = defineProps<{
  entity?: ChatObjectDto;
  size?: number;
  badge?: string | number;
  dot?: boolean | null;
  thumb?: boolean;
  isStatus?: boolean;
}>();

</script>