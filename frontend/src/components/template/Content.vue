<template>
  <div class="content">
    <router-view> </router-view> <!-- sempre que eu selecionar um rota, sera aberta aqui -->
  </div>
</template>

<script>
export default {
  name: "Content",
};
</script>

<style>
.content {
  grid-area: content;
  background-color: #efefef;
  padding: 20px;
}
</style>