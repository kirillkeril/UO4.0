<script lang="ts" setup>
import type {Appeal} from "~/domain/Appeal";
import {useAsyncData} from "#app";

const columns = [
  {
    key: 'body',
    label: 'Текст',
    sortable: false
  }, {
    key: 'theme',
    label: 'Тема',
    sortable: true
  }, {
    key: 'themeGroup',
    label: 'Группа тем',
    sortable: true
  },
];

const sourceModel = useState("snLink", () => {
  return {
    link: "",
  }
});

const {data: appeals, error} = await useAsyncData<Appeal[]>("appeal", () => $fetch('appeal', {
  baseURL: "http://localhost:5000",
  timeout: 3000,
}));

console.log(appeals);

onMounted(() => {
  const toast = useToast();
  if (error) {
    toast.add({title: error.value?.name, description: error.value?.message, timeout: 3000});
  }
});

const addGroup = async () => {
  const {data, error} = await useFetch("", {
    baseURL: "https://localhost:5000/sources",
    method: "POST",
    cache: 'no-cache',
    body: {
      source: sourceModel.value.link
    }
  });
  if (error) {
    useToast().add({title: error.value?.name, description: error.value?.message})
  }
}
</script>

<template>
  <UContainer class="pt-5">
    <h1 class="text-3xl text-center mb-5">Админ-панель</h1>
    <UForm :state="sourceModel" @submit="() => addGroup()">
      <UFormGroup label="Ссылка на группу">
        <UInput v-model="sourceModel.link" placeholder="Ссылка"/>
      </UFormGroup>
      <UButton class="mt-5" type="submit">Принять</UButton>
    </UForm>
    <UTable v-if="!error" :columns="columns" :rows="appeals ?? []" :sort="{column: '', direction: 'asc'}"/>
  </UContainer>
</template>

<style scoped>

</style>
