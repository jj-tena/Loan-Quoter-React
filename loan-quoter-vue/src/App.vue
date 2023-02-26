<script setup lang="ts">
  import {ref, computed, watch} from 'vue'
  import Header from './components/Header.vue'
  import Button from './components/Button.vue'
  import {calculateTotalAmount} from './helpers'

  const quantity = ref(10000);
  const months = ref(6);
  const total = ref(0);

  const MIN = 0;
  const MAX = 20000;
  const STEP = 100; 

  const formatMoney = (money: number) => {
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    });
    return formatter.format(money);
  }

  watch([quantity, months], () => {
    total.value = calculateTotalAmount(quantity.value, months.value);
  })

  const monthlyPayment = computed(() => {
    return total.value / months.value;
  })

  const handleChangeDecrease = () => {
    const value = quantity.value - STEP;
    if (value<MIN) {
      alert('Quantity not allowed');
      return;
    }
    quantity.value = value;
  }

  const handleChangeIncrease = () => {
    const value = quantity.value + STEP;
    if (value>MAX) {
      alert('Quantity not allowed');
      return;
    }
    quantity.value = value;
  }

</script>

<template>
  <div class="my-20 max-w-lg mx-auto bg-white shadow p-10">
    <Header/>
    <div class="flex justify-around mt-10">
      <Button
        :operador="'-'"
        @fn="handleChangeDecrease"
      />
      <Button
        :operador="'+'"
        @fn="handleChangeIncrease"
      />
    </div>
    <div class="my-5">
      <input
        type="range"
        class="w-full bg-gray-200 accent-lime-500 hover:accent-lime-600"
        :min="MIN"
        :max="MAX"
        :step="STEP"
        v-model.number="quantity"
      />
      <p class="text-center my-10 text-5xl font-extrabold text-indigo-600">{{formatMoney(quantity)}}</p>
      <h2 class="text-2xl font-extrabold text-gray-500 text-center">
        Choose a <span class="text-indigo-600">term</span> to pay
      </h2>
      <select class="w-full p-2 bg-white border border-gray-300
      rounded-lg text-center text-xl font-bold text-gray-500 mt-5"
      v-model.number="months"
      >
        <option value="6">6 Months</option>
        <option value="12">12 Months</option>
        <option value="24">24 Months</option>
      </select>
    </div>
    <div v-if="total>0" class="my-5 space-y-3 bg-gray-50 p-5">
      <h2 class="text-2xl font-extrabold text-gray-500 text-center">
        Summary of <span class="text-indigo-600">payments</span>
      </h2>
      <p class="text-xl text-gray-500 text-center font-bold">{{months}} Months</p>
      <p class="text-xl text-gray-500 text-center font-bold">{{formatMoney(total)}} Total payable</p>
      <p class="text-xl text-gray-500 text-center font-bold">{{formatMoney(monthlyPayment)}} Monthly</p>
    </div>
    <p v-else class="text-center text-xl font-extrabold text-red-500">Set quantity and loads</p>
  </div>
</template>

<style scoped>
</style>
