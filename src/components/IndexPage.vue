<template>
  <div>
    <img src="../assets/logo.png">
    <form action="POST" @submit.prevent="handleSubmit()" class='search-form'>
      <input type="text" v-model="searchQuery" placeholder="Find anywere..." class='search-form__input'>
      <button type='submit' class='search-form__button'>Search</button>
    </form>
  </div>
</template>

<script>

export default {
  name: 'IndexPage',
  data () {
    return {
      searchQuery: ''
    }
  },
  methods: {
    handleSubmit () {
      this.$router.history.push(`/search/${this.searchQuery}`)
      this.searchQuery = ''
    }
  }
}

</script>

<style lang="scss">
  .search-form {
    display: flex;
    justify-content: center;
    max-width: 400px;
    margin: 0 auto;

    &__input {
      display: block;
      flex: 1 1 100%;
      max-width: 100%;
      padding: 5px 12px;
      border: 2px solid #2962FF;
    }

    &__button {
      display: inline-flex;
      background-color: #2962FF;
      border: 2px solid #2962FF;
      color: #fff;
      box-shadow: none;
    }
  }
</style>
