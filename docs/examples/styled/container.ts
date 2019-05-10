import styled from '@emotion/styled'

export const Container = styled('div')`
  > [contenteditable='true'] {
    &:focus {
      outline: none;
    }
  }

  ul {
    padding: 0;
  }

  li {
    padding: 0;
    > p {
      margin: 0;
    }

    &.todo-item {
      display: flex;

      &[data-done=true] {
        text-decoration: line-through;
      }

      .todo-checkbox {
        height: 20px;
        display: inline-block;
      }

      .todo-content {
        p {
          margin: 0;
        }
      }
    }
  }

  blockquote {
    border-left: 2px solid #ccc;
    margin-left: 0;
    padding-left: 1em;
  }
`