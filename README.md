# vuelidate-messages
> Convenient and lighweight generation of messages on validation errors from vuelidate"

## Installation

```bash
npm install vuelidate-messages --save
```

The recommended way to use this lib is to import its mixin straight into your vue component 
along with the mixin from the `vuelidate` package

```javascript
import { validationMixin } from 'vuelidate'
import { validationMessagesMixin } from 'vuelidate-messages'

var Component = Vue.extend({
  mixins: [validationMixin, validationMessagesMixin],
  validations { ... } // your vuelidate configuration
  ...
}
```

After attaching the mixin expect the `$errors` field exposed on the component instance
