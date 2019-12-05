import { storiesOf } from '@storybook/vue';
import ClickButton from './ClickButton.vue';

export default {
  title: 'ClickButton',
  components: { ClickButton },
  template: '<click-button></click-button>'
};

storiesOf('ClickButton', module)
  .add('normal', () => ({
    components: { ClickButton },
    template: '<click-button value="normal"/>'
  }))
  .add('red', () => ({
    components: { ClickButton },
    template: '<click-button class="red" value="red"/>'
  }));
