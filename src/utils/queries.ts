import gql from "graphql-tag";

export const FEED_QUERY: any = gql`
  {
    feed {
      links {
        id
        createdAt
        url
        description
      }
    }
  }
`;

export const POST_MUTATION: any = gql`
  mutation PostMutation($description: String!, $url: String!) {
    post(description: $description, url: $url) {
      id
      createdAt
      url
      description
      postedBy {
        id
        name
      }
      votes {
        id
        user {
          id
        }
      }
    }
  }
`;

export const SIGNUP_MUTATION: any = gql`
  mutation SignupMutation($email: String!, $password: String!, $name: String!) {
    signup(email: $email, password: $password, name: $name) {
      token
    }
  }
`;

export const LOGIN_MUTATION: any = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;
