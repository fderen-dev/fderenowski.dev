import MyComponent from '../../../../slices/Input';

export default {
  title: 'slices/Input'
}


export const _Default = () => <MyComponent slice={{"variation":"default","version":"sktwi1xtmkfgx8626","items":[{}],"primary":{"name":"saddle","label":"relationship","placeholder":"against","required":false,"requiredvalidationmessage":"quiet","minlength":89,"minlengthvalidationmessage":"how","maxlength":94,"maxlengthvalidationmessage":"courage"},"id":"_Default","slice_type":"text_input"}} />
_Default.storyName = ''

export const _TextArea = () => <MyComponent slice={{"variation":"textArea","version":"sktwi1xtmkfgx8626","items":[{}],"primary":{"name":"review","label":"least","placeholder":"bill","required":true,"requiredvalidationmessage":"although","minlength":40,"minlengthvalidationmessage":"but","maxlength":37,"maxlengthvalidationmessage":"none"},"id":"_TextArea","slice_type":"text_input"}} />
_TextArea.storyName = ''

export const _Email = () => <MyComponent slice={{"variation":"email","version":"sktwi1xtmkfgx8626","items":[{}],"primary":{"name":"these","label":"law","placeholder":"composed","required":true,"requiredvalidationmessage":"brush","emailvalidationmessage":"minerals"},"id":"_Email","slice_type":"text_input"}} />
_Email.storyName = ''
