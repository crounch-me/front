import { storiesOf } from '@storybook/vue';
import ClickButton from './ClickButton.vue';

storiesOf('ClickButton', module)
  .add('normal', () => ({
    components: { ClickButton },
    template: '<click-button>normal</click-button>'
  }))
  .add('red', () => ({
    components: { ClickButton },
    template: '<click-button class="red">red</click-button>'
  }));
