import ClickButton from './ClickButton.vue';

export default {
  title: 'ClickButton',
  components: { ClickButton },
  template: '<click-button></click-button>'
};

export const zouz = () => '<click-button value="zouz"/>'
export const zouz2 = () => '<click-button class="zouz" value="zouz2"/>'
