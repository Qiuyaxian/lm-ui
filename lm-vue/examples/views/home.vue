<template>
  <vup-template>
    <vup-navbar>demo</vup-navbar>
    <vup-grid :cols="4">
      <vup-grid-item
        v-for="(grid, gridIndex) in grids"
        :key="gridIndex"
        :label="grid.label"
        :icon="grid.icon"
        :link="grid.link"
      ></vup-grid-item>
    </vup-grid>
  </vup-template>
</template>

<script>
export default {
  data() {
    return {
      grids: [
        {
          label: "Grid",
          icon:
            "https://www.jzmt168.com/static/images/goods/3fded81b-c84c-463b-92b7-16765fa0b362.jpg",
          link: "/grid"
        },
        {
          label: "Button",
          icon:
            "https://www.jzmt168.com/static/images/goods/3fded81b-c84c-463b-92b7-16765fa0b362.jpg",
          link: "/button"
        },
        {
          label: "Cell",
          icon:
            "https://www.jzmt168.com/static/images/goods/3fded81b-c84c-463b-92b7-16765fa0b362.jpg",
          link: "/cell"
        },
        {
          label: "Badge",
          icon:
            "https://www.jzmt168.com/static/images/goods/3fded81b-c84c-463b-92b7-16765fa0b362.jpg",
          link: "/badge"
        },
        {
          label: "Tab",
          icon:
            "https://www.jzmt168.com/static/images/goods/3fded81b-c84c-463b-92b7-16765fa0b362.jpg",
          link: "/tab"
        },
        {
          label: "switch",
          icon:
            "https://www.jzmt168.com/static/images/goods/3fded81b-c84c-463b-92b7-16765fa0b362.jpg",
          link: "/switch"
        },
        {
          label: "toast",
          icon:
            "https://www.jzmt168.com/static/images/goods/3fded81b-c84c-463b-92b7-16765fa0b362.jpg",
          link: "/toast"
        },
        {
          label: "flexbox",
          icon:
            "https://www.jzmt168.com/static/images/goods/3fded81b-c84c-463b-92b7-16765fa0b362.jpg",
          link: "/flexbox"
        },
        {
          label: "divider",
          icon:
            "https://www.jzmt168.com/static/images/goods/3fded81b-c84c-463b-92b7-16765fa0b362.jpg",
          link: "/divider"
        },
        {
          label: "marquee",
          icon:
            "https://www.jzmt168.com/static/images/goods/3fded81b-c84c-463b-92b7-16765fa0b362.jpg",
          link: "/marquee"
        },
        {
          label: "count-up",
          icon:
            "https://www.jzmt168.com/static/images/goods/3fded81b-c84c-463b-92b7-16765fa0b362.jpg",
          link: "/count-up"
        },
        {
          label: "count-down",
          icon:
            "https://www.jzmt168.com/static/images/goods/3fded81b-c84c-463b-92b7-16765fa0b362.jpg",
          link: "/count-down"
        },
        {
          label: "panel",
          icon:
            "https://www.jzmt168.com/static/images/goods/3fded81b-c84c-463b-92b7-16765fa0b362.jpg",
          link: "/panel"
        },
        {
          label: "textarea",
          icon:
            "https://www.jzmt168.com/static/images/goods/3fded81b-c84c-463b-92b7-16765fa0b362.jpg",
          link: "/textarea"
        },
        {
          label: "cell-preview",
          icon:
            "https://www.jzmt168.com/static/images/goods/3fded81b-c84c-463b-92b7-16765fa0b362.jpg",
          link: "/cell-preview"
        },
        {
          label: "form-preview",
          icon:
            "https://www.jzmt168.com/static/images/goods/3fded81b-c84c-463b-92b7-16765fa0b362.jpg",
          link: "/form-preview"
        },
        {
          label: "rater",
          icon:
            "https://www.jzmt168.com/static/images/goods/3fded81b-c84c-463b-92b7-16765fa0b362.jpg",
          link: "/rater"
        },
        {
          label: "search",
          icon:
            "https://www.jzmt168.com/static/images/goods/3fded81b-c84c-463b-92b7-16765fa0b362.jpg",
          link: "/search"
        },
        {
          label: "spinner",
          icon:
            "https://www.jzmt168.com/static/images/goods/3fded81b-c84c-463b-92b7-16765fa0b362.jpg",
          link: "/spinner"
        },
        {
          label: "tabbar",
          icon:
            "https://www.jzmt168.com/static/images/goods/3fded81b-c84c-463b-92b7-16765fa0b362.jpg",
          link: "/tabbar"
        },
        {
          label: "clock",
          icon:
            "https://www.jzmt168.com/static/images/goods/3fded81b-c84c-463b-92b7-16765fa0b362.jpg",
          link: "/clock"
        },
        {
          label: "dialog",
          icon:
            "https://www.jzmt168.com/static/images/goods/3fded81b-c84c-463b-92b7-16765fa0b362.jpg",
          link: "/dialog"
        },
        {
          label: "icon",
          icon:
            "https://www.jzmt168.com/static/images/goods/3fded81b-c84c-463b-92b7-16765fa0b362.jpg",
          link: "/icon"
        },
        {
          label: "confirm",
          icon:
            "https://www.jzmt168.com/static/images/goods/3fded81b-c84c-463b-92b7-16765fa0b362.jpg",
          link: "/confirm"
        },
        {
          label: "alert",
          icon:
            "https://www.jzmt168.com/static/images/goods/3fded81b-c84c-463b-92b7-16765fa0b362.jpg",
          link: "/alert"
        },
        {
          label: "actionsheet",
          icon:
            "https://www.jzmt168.com/static/images/goods/3fded81b-c84c-463b-92b7-16765fa0b362.jpg",
          link: "/actionsheet"
        },
        {
          label: "picker",
          icon:
            "https://www.jzmt168.com/static/images/goods/3fded81b-c84c-463b-92b7-16765fa0b362.jpg",
          link: "/picker"
        },
        {
          label: "popup-picker",
          icon:
            "https://www.jzmt168.com/static/images/goods/3fded81b-c84c-463b-92b7-16765fa0b362.jpg",
          link: "/popup-picker"
        },
        {
          label: "address",
          icon:
            "https://www.jzmt168.com/static/images/goods/3fded81b-c84c-463b-92b7-16765fa0b362.jpg",
          link: "/address"
        }
      ]
    };
  }
};
</script>

<style lang="scss">
</style>
