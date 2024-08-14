<script setup lang="ts">
const modal2Visible = ref<boolean>(false);


const open = ()=>{

    modal2Visible.value = true;
}
const close = ()=>{

    modal2Visible.value = false;
}
defineExpose({
    open,close
});
</script>

<template>
  <a-modal
    v-model:open="modal2Visible"
    title="Vertically centered modal dialog"
    centered
    @ok="modal2Visible = false"
  >
    <p>some contents...</p>
    <p>some contents...</p>
    <p>some contents...</p>
  </a-modal>
</template>
