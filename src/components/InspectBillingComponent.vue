<template>
  <section id="inspect" class="wrapper style6 spotlights">
    <section>
      <div class="content">
        <div class="inner">
          <h2>Try to Inspect data:</h2>
          <section>
            <h3>A simple search that uses the selected API key</h3>
            <form @submit.prevent="inspect">
              <div class="row gtr-uniform">
                <div class="col-10 col-12-xsmall">
                  <input v-model="inspectInput" type="text" name="data" placeholder="Input email or domain"/>
                </div>
                <div class="col-2 col-12-xsmall">
                  <ul class="actions">
                    <li><input type="submit" value="inspect" class="button"/>
                    </li>
                  </ul>
                </div>
                <div class="col-12 col-12-xsmall">
                  <span v-show="inspectSuccessResponse" class="response success">{{ inspectSuccessResponse }}</span>
                  <span v-show="inspectErrorResponse" class="response failed">{{ inspectErrorResponse }}</span>
                </div>
              </div>
            </form>
          </section>
        </div>
      </div>
    </section>
  </section>
</template>

<script>
import CheckmailService from "@/services/checkmail.service";
import {mapState} from "vuex";
export default {
  data() {
    return {
      inspectInput: '',
      inspectSuccessResponse: '',
      inspectErrorResponse: ''
    }
  },
  computed: {
    ...mapState({
      projectState: state => state.project.project,
    })
  },
  methods: {
    async inspect() {
      this.inspectSuccessResponse = '';
      this.inspectErrorResponse = '';
      CheckmailService.inspectPrivate(this.inspectInput, this.projectState.token).then(
          response => {
            this.inspectSuccessResponse = response.data.message;
            setTimeout(() => {
              this.inspectSuccessResponse = '';
              this.inspectInput = '';
            }, 5000);
          },
          error => {
            this.inspectErrorResponse = error.response.data.message;
            setTimeout(() => {
              this.inspectErrorResponse = '';
              this.inspectInput = '';
            }, 5000);
          }
      );
    }
  }
}
</script>

<style lang="scss" scoped>

</style>