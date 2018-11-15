<template>
  <div class="page_container">
      <div class="list">
        <ul>
          <li>
              <a href="">
                <img src="" alt="" width="">
              </a>
          </li>
        </ul>
      </div>
  </div>
</template>

<script>
export default {
  name: 'activePage',
  components: {

  },
  props: {
    params: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data () {
    return {
      urlSearchParams: {}
    }
  },
  created () {
    this.urlSearchParams = this.params
  },
  mounted () {

  },
  methods: {

  },
  watch: {
    params: {
      immediate: true,
      handler: function (val = {}) {
        this.urlSearchParams = val
      }
    }
  }
}
</script>

<style lang="scss">
  .list{
    li{
      width: 662px;
      height: 490px;
      background: #fff;
      border-radius: 6px;
      box-shadow: 1px -1px -1px #000
    }
  }

</style>
