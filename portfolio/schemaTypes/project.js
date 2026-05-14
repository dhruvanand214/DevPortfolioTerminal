export default {
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
    },
    {
      name: 'techLabel',
      title: 'Tech Label',
      type: 'string',
      description: 'E.g., "MERN Stack Architecture"',
    },
    {
      name: 'file',
      title: 'File Name',
      type: 'string',
      description: 'E.g., "event-ledger.exe"',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
    {
      name: 'image',
      title: 'Project Image',
      type: 'image',
      options: {
        hotspot: true, // Allows cropping and focal point selection
      },
    },
    {
      name: 'features',
      title: 'Features',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'tech',
      title: 'Technologies',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'link',
      title: 'GitHub Link',
      type: 'url',
    },
    {
      name: 'liveLink',
      title: 'Live Preview Link',
      type: 'url',
    },
    {
      name: 'impact',
      title: 'Impact Stats',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'label', type: 'string', title: 'Label' },
            { name: 'value', type: 'string', title: 'Value' }
          ]
        }
      ]
    },
    {
      name: 'stars',
      title: 'GitHub Stars',
      type: 'number',
    },
    {
      name: 'forks',
      title: 'GitHub Forks',
      type: 'number',
    },
    {
      name: 'views',
      title: 'Views',
      type: 'string',
    }
  ],
}
