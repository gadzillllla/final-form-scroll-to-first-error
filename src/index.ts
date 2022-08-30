import { FormApi, FormState } from 'final-form';

const scrollToError = () => {
  const forms = Array.from(document.forms);
  let nodesWithErrorClass: Element[] = [];
  forms.forEach((formNode) => {
    nodesWithErrorClass = [...nodesWithErrorClass, ...Array.from(formNode.querySelectorAll('[class*="error"]'))];
  });

  const [firstNodeWithError] = nodesWithErrorClass;
  if (firstNodeWithError) {
    firstNodeWithError.scrollIntoView({ behavior: 'smooth' });
  }
};

export const createScrollToErrorDecorator = () => (form: FormApi) => {
  const originalSubmit = form.submit;

  let state = {};
  const unsubscribe = form.subscribe(
    (nextState) => {
      state = nextState;
    },
    { errors: true },
  );

  const afterSubmit = () => {
    const { errors } = state as FormState<any>;
    if (errors && Object.keys(errors).length) {
      setTimeout(() => {
        scrollToError();
      }, 100);
    }
  };

  form.submit = () => {
    const result = originalSubmit.call(form);
    if (result && typeof result.then === 'function') {
      result.then(afterSubmit, () => {});
    } else {
      afterSubmit();
    }
    return result;
  };

  return () => {
    unsubscribe();
    form.submit = originalSubmit;
  };
};
