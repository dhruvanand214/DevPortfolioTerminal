export default {
  name: 'skillCategory',
  title: 'Skill Category',
  type: 'document',
  fields: [
    {
      name: 'id',
      title: 'ID',
      type: 'string',
      description: 'E.g., "frontend", "backend" (used for keys)',
    },
    {
      name: 'name',
      title: 'Command Name',
      type: 'string',
      description: 'E.g., "ls frontend/"',
    },
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'E.g., "Frontend Development"',
    },
    {
      name: 'skills',
      title: 'Skills',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'name', type: 'string', title: 'Name' },
            { name: 'icon', type: 'string', title: 'Icon Emoji' }
          ]
        }
      ]
    }
  ],
}
