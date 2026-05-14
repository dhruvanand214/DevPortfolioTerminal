export default {
  name: 'experience',
  title: 'Experience',
  type: 'document',
  fields: [
    {
      name: 'role',
      title: 'Role',
      type: 'string',
    },
    {
      name: 'company',
      title: 'Company',
      type: 'string',
    },
    {
      name: 'location',
      title: 'Location',
      type: 'string',
    },
    {
      name: 'period',
      title: 'Time Period',
      type: 'string',
    },
    {
      name: 'file',
      title: 'File Name',
      type: 'string',
      description: 'E.g., "tech-mahindra.ts"',
    },
    {
      name: 'highlights',
      title: 'Highlights',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'text', type: 'text', title: 'Text' },
            { name: 'keywords', type: 'array', title: 'Keywords', of: [{ type: 'string' }] }
          ]
        }
      ]
    }
  ],
}
