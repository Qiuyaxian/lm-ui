<template>
  <lm-page>
    <lm-header class="lm-header-fixed"
               slot="header" :leftOptions="{
      showBack: false
    }">demo</lm-header>
    <lm-scroll>
      <lm-group v-for="(group, index) in groups"
                :key="index">
        <lm-group-title slot="group-title"
                        :header-label="group.title"></lm-group-title>
        <lm-cell v-for="(component, cIndex) in group.components"
                 :key="cIndex"
                 :label="component.label"
                 :link="component.link"></lm-cell>
      </lm-group>
    </lm-scroll>
  </lm-page>
</template>
<script lang="ts">
import {
  Component,
  Emit,
  Inject,
  Model,
  Prop,
  Provide,
  Vue,
  Watch
} from "vue-property-decorator";
interface ComponentProps {
  label: string;
  link: string;
}
interface GroupProps {
  title: string;
  components: ComponentProps[];
}

@Component({
  created() {
    console.log(this.$lm, "this.$lm");
  },
  // 声明周期钩子
  mounted() {},
  beforeRouteEnter(to, from, next) {
    next();
  },
  beforeRouteUpdate(to, from, next) {
    next();
  },
  beforeRouteLeave(to, from, next) {
    next();
  }
})
export default class Home extends Vue {
  groups: GroupProps[] = [
    {
      title: "表单",
      components: [
        {
          label: "switch",
          link: "/switch"
        },
        {
          label: "textarea",
          link: "/textarea"
        },
        {
          label: "cell-preview",
          link: "/cell-preview"
        },
        {
          label: "form-preview",
          link: "/form-preview"
        },
        {
          label: "rater",
          link: "/rater"
        },
        {
          label: "actionsheet",
          link: "/actionsheet"
        },
        {
          label: "popup",
          link: "/popup"
        },
        {
          label: "picker",
          link: "/picker"
        },
        {
          label: "popup-picker",
          link: "/popup-picker"
        },
        {
          label: "address",
          link: "/address"
        },
        {
          label: "datetime",
          link: "/datetime"
        },
        {
          label: "datetime-range",
          link: "/datetime-range"
        }
      ]
    },
    {
      title: "基础组件",
      components: [
        {
          label: "grid",
          link: "/grid"
        },
        {
          label: "button",
          link: "/button"
        },
        {
          label: "cell",
          link: "/cell"
        },
        {
          label: "badge",
          link: "/badge"
        },
        {
          label: "flexbox",
          link: "/flexbox"
        },
        {
          label: "divider",
          link: "/divider"
        },
        {
          label: "panel",
          link: "/panel"
        }
      ]
    },
    {
      title: "操作反馈",
      components: [
        {
          label: "toast",
          link: "/toast"
        },
        {
          label: "dialog",
          link: "/dialog"
        },
        {
          label: "confirm",
          link: "/confirm"
        },
        {
          label: "alert",
          link: "/alert"
        }
      ]
    },
    {
      title: "导航相关",
      components: [
        {
          label: "tab",
          link: "/tab"
        },
        {
          label: "tabbar",
          link: "/tabbar"
        }
      ]
    },
    {
      title: "展示相关",
      components: [
        {
          label: "scroll",
          link: "/scroll"
        },
        {
          label: "marquee",
          link: "/marquee"
        },
        {
          label: "count-up",
          link: "/count-up"
        },
        {
          label: "count-down",
          link: "/count-down"
        },
        {
          label: "spinner",
          link: "/spinner"
        },
        {
          label: "clock",
          link: "/clock"
        },

        {
          label: "icon",
          link: "/icon"
        }
      ]
    },
    {
      title: "搜索相关",
      components: [
        {
          label: "search",
          link: "/search"
        }
      ]
    }
  ];
}
</script>

<style lang="scss">
</style>
