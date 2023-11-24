<script lang="ts" setup>
import type {Ref} from "vue";

interface Appeal {
  body: string
}

interface RequestState {
  state: string;
  error: any;
  value: any;
}

const errorState: Ref<boolean> = useState("error", () => false);
const model: Ref<Appeal> = useState("appeal", () => {
  return {
    body: ""
  }
});
const state: Ref<RequestState> = useState("request", () => {
  return {
    state: "",
    error: null,
    value: null,
  }
});

const sendAppeal = async () => {
  const {data, error, pending} = await useFetch("appeal", {
    baseURL: "http://bulbaman.me:16001",
    method: "POST",
    retry: false,
    body: JSON.stringify(model.value),
    server: false
  });
  model.value.body = "";
  if (error) {
    errorState.value = true;
    return;
  }
}
</script>

<template>
  <ClientOnly>
    <UContainer class="pt-2">
      <h1 class="text-3xl text-center mb-5">Обращения граждан!</h1>
      <UForm :state="model" class="flex flex-col justify-center items-center p-4">
        <UFormGroup class="w-full mt-3" label="Ваше обращение">
          <UTextarea v-model="model.body" autoresize/>
        </UFormGroup>
        <UButton class="flex justify-center mt-3" @click.prevent="sendAppeal">Отправить</UButton>
      </UForm>
    </UContainer>
  </ClientOnly>
  <Teleport v-if="errorState" to="body">
    <UContainer class="bottom-0 left-0 absolute">
      <UAlert :title="'Ошибка'" class="w-fit">
        {{ errorState }}
      </UAlert>
    </UContainer>
  </Teleport>
</template>

<style scoped>
</style>
