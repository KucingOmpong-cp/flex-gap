const plugin = require('tailwindcss/plugin')

const baseStyles = {
  margin: `-var(--nbs-flex-gap)`,
}

const childStyles = {
  margin: `-var(--nbs-child-gap)`,
}

const flexGap = plugin(
  function ({ addComponents, matchComponents, theme, variants, e }) {
    const values = theme('flexGap')

    if (matchComponents) {
      matchComponents(
        {
          'flex-gap': (value) => [
            {
              ...baseStyles,
              '--nbs-flex-gap': `-${value}`,
            },
            {
              '> *': {
                ...childStyles,
                '--nbs-child-gap': value,
              },
            },
          ],
        },
        { values }
      )

      addComponents(noneComponent)

      return
    }

    const baseSelectors = Object.entries(values)
      .map(([key, value]) => {
        return `.${e(`flex-gap-${key}`)}`
      })
      .join(',\n')

    const childSelectors = Object.entries(values)
      .map(([key, value]) => {
        return `.${e(`flex-gap-${key}`)} > *`
      })
      .join(',\n')

    addComponents(
      [
        {
          [baseSelectors]: baseStyles,
          [childSelectors]: childStyles,
        },
        Object.entries(values).map(([key, value]) => {
          return {
            [`.${e(`flex-gap-${key}`)}`]: {
              '--nbs-flex-gap': value,
            },
          }
        }),
      ],
      variants('flexGap')
    )
  },
  {
    theme: {
      flexGap: {
        0: '0',
        1: '1',
        2: '2',
        3: '3',
        4: '4',
        5: '5',
        6: '6',
        7: '7',
        8: '8',
        9: '9',
        10: '10',
        11: '11',
        12: '12',
        13: '13',
        14: '14',
        15: '15',
        16: '16',
      },
    },
    variants: {
      flexGap: ['responsive'],
    },
  }
)

module.exports = flexGap