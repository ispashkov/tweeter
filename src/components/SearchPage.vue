<template>
  <div class="result-page">
    <div class="result-page-nav">
      <router-link to='/' class="result-page__back">Home</router-link>
    </div>

    <div class="tweets">
      <div v-if="isFetching">Loading...</div>
      <div v-if="getError" class='error'>Please, refresh page</div>
      <ul v-if="getTweets.length" class="tweets-items">
        <li v-for="(tweet, index) in getTweets" :key='index' class="tweet">
          <div class="tweet-author">
            <a :href="`https://twitter.com/${tweet.user.screen_name}`" class='tweet-author__name'>@{{tweet.user.screen_name}}</a>
          </div>
          <a :href="`https://twitter.com/${tweet.user.screen_name}/status/${tweet.id_str}`" class="tweet__text" target='_blank'>{{tweet.text}}</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'

export default {
  name: 'SearchPage',
  computed: {
    ...mapGetters(['isFetching', 'getTweets', 'getError']),

    result () {
      return this.$router.history.current.params.query
    }
  },
  watch: {
    $route: function (val, prevVal) {
      if (val.params.query !== prevVal.params.query) {
        this.fetchTweets(this.$route.params.query)
      }
    }
  },
  methods: {
    ...mapActions(['fetchTweets', 'clearTweets'])
  },
  mounted () {
    this.fetchTweets(this.$route.params.query)
  },
  beforeDestroy () {
    this.clearTweets()
  }
}
</script>

<style lang='scss'>

  .result-page {
    &-nav {
      display: block;
      margin: 0 0 40px;
    }

    &__back {
      color: #42A5F5;
    }
  }

  .tweets-items {
    display: block;
    max-width: 600px;
    margin: 0 auto;
    padding: 0;
  }

  .tweet {
    display: block;
    margin: 0 0 20px;
    padding: 20px;
    background-color: #E3F2FD;
    border: 1px solid #BBDEFB;

    &-author {
      display: block;
      margin: 0 0 12px;
      text-align: left;

      &__name {
        color: #BDBDBD;
      }
    }

    &__text {
      display: block;
      text-align: left;
      font-size: 14px;
      color: #424242;
    }
  }

  .error {
    color: red;
  }
</style>
