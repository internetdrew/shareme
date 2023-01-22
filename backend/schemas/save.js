export default {
  name: 'save',
  title: 'Save',
  type: 'document',
  fields: [
    {
      name: 'savedBy',
      title: 'SavedBy',
      type: 'reference',
      to: [{type: 'user'}],
    },
    {
      name: 'userId',
      title: 'UserId',
      type: 'string',
    },
  ],
}
