const PING_EXAMPLE = {
  id: 1,
  username: 'pg',
  objectID: 'pg'
}

const SEARCH_EXAMPLE = {
  hits: [
    {
      created_at: '2019-09-23T07:00:38.000Z',
      title: 'Serverless: slower and more expensive',
      url: 'http://einaregilsson.com/serverless-15-percent-slower-and-eight-times-more-expensive/',
      author: 'kiyanwang',
      points: 1787,
      story_text: null,
      comment_text: null,
      num_comments: 712,
      story_id: null,
      story_title: null,
      story_url: null,
      parent_id: null,
      created_at_i: 1569222038,
      objectID: '21046547'
    },
    {
      created_at: '2019-02-04T21:36:48.000Z',
      title: '“Lambda and serverless is one of the worst forms of proprietary lock-in” (2017)',
      url: 'https://www.theregister.co.uk/2017/11/06/coreos_kubernetes_v_world/',
      author: 'peter_d_sherman',
      points: 746,
      story_text: null,
      comment_text: null,
      num_comments: 394,
      story_id: null,
      story_title: null,
      story_url: null,
      parent_id: null,
      created_at_i: 1549316208,
      objectID: '19080875'
    }
  ],
  nbHits: 2
}

const LARGE_RESULT_EXAMPLE = {
  hits: [
    {
      created_at: '2019-09-23T07:00:38.000Z',
      title: 'Serverless: slower and more expensive',
      url: 'http://einaregilsson.com/serverless-15-percent-slower-and-eight-times-more-expensive/',
      author: 'kiyanwang',
      points: 1787,
      story_text: null,
      comment_text: null,
      num_comments: 712,
      story_id: null,
      story_title: null,
      story_url: null,
      parent_id: null,
      created_at_i: 1569222038,
      objectID: '21046547'
    },
    {
      created_at: '2019-02-04T21:36:48.000Z',
      title: '“Lambda and serverless is one of the worst forms of proprietary lock-in” (2017)',
      url: 'https://www.theregister.co.uk/2017/11/06/coreos_kubernetes_v_world/',
      author: 'peter_d_sherman',
      points: 746,
      story_text: null,
      comment_text: null,
      num_comments: 394,
      story_id: null,
      story_title: null,
      story_url: null,
      parent_id: null,
      created_at_i: 1549316208,
      objectID: '19080875'
    },
    {
      created_at: '2019-02-04T21:36:48.000Z',
      title: '“Lambda and serverless is one of the worst forms of proprietary lock-in” (2017)',
      url: 'https://www.theregister.co.uk/2017/11/06/coreos_kubernetes_v_world/',
      author: 'peter_d_sherman',
      points: 746,
      story_text: null,
      comment_text: null,
      num_comments: 394,
      story_id: null,
      story_title: null,
      story_url: null,
      parent_id: null,
      created_at_i: 1549316208,
      objectID: '19080875'
    },
    {
      created_at: '2019-02-04T21:36:48.000Z',
      title: '“Lambda and serverless is one of the worst forms of proprietary lock-in” (2017)',
      url: 'https://www.theregister.co.uk/2017/11/06/coreos_kubernetes_v_world/',
      author: 'peter_d_sherman',
      points: 746,
      story_text: null,
      comment_text: null,
      num_comments: 394,
      story_id: null,
      story_title: null,
      story_url: null,
      parent_id: null,
      created_at_i: 1549316208,
      objectID: '19080875'
    },
    {
      created_at: '2019-02-04T21:36:48.000Z',
      title: '“Lambda and serverless is one of the worst forms of proprietary lock-in” (2017)',
      url: 'https://www.theregister.co.uk/2017/11/06/coreos_kubernetes_v_world/',
      author: 'peter_d_sherman',
      points: 746,
      story_text: null,
      comment_text: null,
      num_comments: 394,
      story_id: null,
      story_title: null,
      story_url: null,
      parent_id: null,
      created_at_i: 1549316208,
      objectID: '19080875'
    },
    {
      created_at: '2019-02-04T21:36:48.000Z',
      title: '“Lambda and serverless is one of the worst forms of proprietary lock-in” (2017)',
      url: 'https://www.theregister.co.uk/2017/11/06/coreos_kubernetes_v_world/',
      author: 'peter_d_sherman',
      points: 746,
      story_text: null,
      comment_text: null,
      num_comments: 394,
      story_id: null,
      story_title: null,
      story_url: null,
      parent_id: null,
      created_at_i: 1549316208,
      objectID: '19080875'
    },
    {
      created_at: '2019-02-04T21:36:48.000Z',
      title: '“Lambda and serverless is one of the worst forms of proprietary lock-in” (2017)',
      url: 'https://www.theregister.co.uk/2017/11/06/coreos_kubernetes_v_world/',
      author: 'peter_d_sherman',
      points: 746,
      story_text: null,
      comment_text: null,
      num_comments: 394,
      story_id: null,
      story_title: null,
      story_url: null,
      parent_id: null,
      created_at_i: 1549316208,
      objectID: '19080875'
    },
    {
      created_at: '2019-02-04T21:36:48.000Z',
      title: '“Lambda and serverless is one of the worst forms of proprietary lock-in” (2017)',
      url: 'https://www.theregister.co.uk/2017/11/06/coreos_kubernetes_v_world/',
      author: 'peter_d_sherman',
      points: 746,
      story_text: null,
      comment_text: null,
      num_comments: 394,
      story_id: null,
      story_title: null,
      story_url: null,
      parent_id: null,
      created_at_i: 1549316208,
      objectID: '19080875'
    },
    {
      created_at: '2019-02-04T21:36:48.000Z',
      title: '“Lambda and serverless is one of the worst forms of proprietary lock-in” (2017)',
      url: 'https://www.theregister.co.uk/2017/11/06/coreos_kubernetes_v_world/',
      author: 'peter_d_sherman',
      points: 746,
      story_text: null,
      comment_text: null,
      num_comments: 394,
      story_id: null,
      story_title: null,
      story_url: null,
      parent_id: null,
      created_at_i: 1549316208,
      objectID: '19080875'
    },
    {
      created_at: '2019-02-04T21:36:48.000Z',
      title: '“Lambda and serverless is one of the worst forms of proprietary lock-in” (2017)',
      url: 'https://www.theregister.co.uk/2017/11/06/coreos_kubernetes_v_world/',
      author: 'peter_d_sherman',
      points: 746,
      story_text: null,
      comment_text: null,
      num_comments: 394,
      story_id: null,
      story_title: null,
      story_url: null,
      parent_id: null,
      created_at_i: 1549316208,
      objectID: '19080875'
    },
    {
      created_at: '2019-02-04T21:36:48.000Z',
      title: '“Lambda and serverless is one of the worst forms of proprietary lock-in” (2017)',
      url: 'https://www.theregister.co.uk/2017/11/06/coreos_kubernetes_v_world/',
      author: 'peter_d_sherman',
      points: 746,
      story_text: null,
      comment_text: null,
      num_comments: 394,
      story_id: null,
      story_title: null,
      story_url: null,
      parent_id: null,
      created_at_i: 1549316208,
      objectID: '19080875'
    }
  ],
  nbHits: 740
}

const jan2017 = 1483228800
const jan2018 = 1514764800
const jan2019 = 1546300800
const jan2020 = 1577836800

module.exports = { SEARCH_EXAMPLE, LARGE_RESULT_EXAMPLE, PING_EXAMPLE, jan2017, jan2018, jan2019, jan2020 }
