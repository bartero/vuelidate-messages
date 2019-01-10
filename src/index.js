const $errors = {}

const validationMessagesMixin = {
  created() {
    this.$errors = $errors

    const matchMessages = (errorMessage, param, childParamsNames) => {
      const messages = []
      errorMessage.$messages = messages

      if (param.$error) {
        childParamsNames.forEach((childParamName) => {
          if (!param[childParamName]) {
            messages.push(errorMessage.$messageSet[childParamName])
          }
        })
      }
    }

    const deepWatch = (parentErrorMessage, parentParam) => {
      for (const paramName in parentParam.$params) {
        const param = parentParam[paramName]
        if (typeof param === 'object' && param !== null) {
          const errorMessage = { $messages: [], $messageSet: {} }
          parentErrorMessage[paramName] = errorMessage

          const childParamsNames = Object.keys(param.$params).filter(
            (childParamName) =>
              param.$params[childParamName] !== null &&
              typeof param[childParamName] === 'boolean'
          )

          this.$watch(
            () => param.$error,
            () => {
              matchMessages(errorMessage, param, childParamsNames)
            }
          )

          childParamsNames.forEach((childParamName) => {
            this.$watch(
              () => param[childParamName],
              () => {
                matchMessages(errorMessage, param, childParamsNames)
              }
            )

            errorMessage.$messageSet[childParamName] = this.$t(
              'validation.' + childParamName,
              {
                field: this.$t('validation.fields.' + paramName),
                ...param.$params[childParamName]
              }
            )
          })

          deepWatch(errorMessage, param)
        }
      }
    }

    deepWatch($errors, this.$v)
  }
}

export { validationMessagesMixin }
