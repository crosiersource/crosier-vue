<template>
  <CrosierBlock :loading="this.loading" />
  <div v-if="this.withoutCard">
    <form @submit.prevent="this.$emit('submitForm')">
      <fieldset :disabled="this.loading">
        <slot></slot>
        <slot name="formChilds"></slot>
        <div class="row mt-3" v-if="!this.semBotaoSalvar">
          <div class="col text-right">
            <Button
              style="width: 12rem"
              label="Salvar"
              type="submit"
              icon="fas fa-save"
              v-if="!this.disabledSubmit"
            />
          </div>
        </div>
      </fieldset>
    </form>
  </div>
  <div v-else>
    <div class="container">
      <div class="card" style="margin-bottom: 50px">
        <div class="card-header">
          <div class="d-flex flex-wrap align-items-center">
            <div class="mr-1">
              <h3>{{ titulo }}</h3>
              <h6 v-if="subtitulo">{{ this.subtitulo }}</h6>
            </div>
            <div class="d-sm-flex flex-nowrap ml-auto">
              <a
                v-show="this.formUrl"
                type="button"
                class="btn btn-info mr-2"
                :href="this.formUrl"
                title="Novo"
              >
                <i class="fas fa-file" aria-hidden="true"></i>
              </a>

              <a
                v-show="this.listUrl"
                role="button"
                class="btn btn-outline-secondary"
                :href="this.listUrl"
                title="Listar"
              >
                <i class="fas fa-list"></i>
              </a>
            </div>
          </div>
        </div>
        <div class="card-body">
          <form @submit.prevent="this.$emit('submitForm')">
            <fieldset :disabled="this.loading">
              <slot></slot>
              <slot name="formChilds"></slot>
              <div class="row mt-3" v-if="!this.semBotaoSalvar">
                <div class="col text-right">
                  <Button
                    style="width: 12rem"
                    label="Salvar"
                    type="submit"
                    icon="fas fa-save"
                    v-if="!this.disabledSubmit"
                  />
                </div>
              </div>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Button from "primevue/button";
import CrosierBlock from "./crosierBlock";

export default {
  name: "CrosierFormS",
  components: {
    CrosierBlock,
    Button,
  },
  emits: ["submitForm"],
  props: {
    titulo: {
      type: String,
    },
    subtitulo: {
      type: String,
    },
    listUrl: {
      type: String,
    },
    formUrl: {
      type: String,
    },
    withoutCard: {
      type: Boolean,
      default: false,
    },
    semBotaoSalvar: {
      type: Boolean,
      default: false,
    },
    disabledSubmit: {
      type: Boolean,
      default: false,
    },
    parentLoad: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    loading() {
      return this.$store.getters.isLoading || this.parentLoad;
    },
  },
};
</script>
