import styled from 'styled-components'

export default styled.div`
  position: relative;
  white-space: nowrap;
  margin-top: 0.875em;

  .sf-table-container {
    overflow-x: auto;
    overflow-y: visible;
  }

  table {
    border-spacing: 0;
    width: 100%;
    padding: 20px 0px;
    position: relative;
    border-radius: 8px;
    overflow: hidden;
    border: 1px solid #f0f1f3;
    box-sizing: border-box;

    &.first-col-sticky {
      overflow: visible;
    }

    tr {
      display: table-row;
      border: 1px solid #f0f1f3;

      &:hover {
        background-color: #f9f9f9;
      }

      @media only screen and (min-width: 915px) {
        &:hover {
          background-color: #f0f1f3;
        }
      }

      @media only screen and (min-device-width: 768px) and (max-device-width: 915px) and (orientation: landscape) {
        display: table-row;
      }
    }

    th {
      img {
        cursor: pointer;
      }

      &:first-of-type {
        position: sticky;
        left: 0;
        background-color: inherit;
      }
    }

    td {
      text-align: left;
      display: block;
      border-bottom: 1px solid #f0f1f3;

      &:first-child {
        padding-top: 1.75rem;

        @media only screen and (min-width: 915px) {
          position: sticky;
          background-color: white;
          padding-top: 8px;
          left: 0;
        }

        @media only screen and (min-device-width: 768px) and (max-device-width: 915px) and (orientation: landscape) {
          padding-top: 1.75rem;
        }
      }

      &:last-child {
        padding-bottom: 1.75rem;

        @media only screen and (min-width: 768px) {
          padding-bottom: 8px;
        }

        @media only screen and (min-device-width: 768px) and (max-device-width: 915px) and (orientation: landscape) {
          padding-bottom: 1.75rem;
        }
      }

      &:before {
        content: attr(data-th) ': ';
        display: inline-block;
        font-weight: bold;

        @media only screen and (min-width: 915px) {
          display: none;
        }

        @media only screen and (min-device-width: 768px) and (max-device-width: 915px) and (orientation: landscape) {
          text-align: left;
          display: block;
        }
      }

      @media only screen and (min-width: 915px) {
        display: table-cell;
      }

      @media only screen and (min-device-width: 768px) and (max-device-width: 915px) and (orientation: landscape) {
        display: inline-block;
      }
    }

    thead {
      display: none;

      @media only screen and (min-width: 915px) {
        display: table-header-group;
      }

      @media only screen and (min-device-width: 768px) and (max-device-width: 915px) and (orientation: landscape) {
        display: none;
      }

      th {
        text-align: left;
        display: none;

        @media only screen and (min-width: 915px) {
          display: table-cell;
        }

        @media only screen and (min-device-width: 768px) and (max-device-width: 915px) and (orientation: landscape) {
          display: none;
        }

        background: #f0f1f3 !important;
      }
    }

    tbody td,
    thead th {
      padding: 8px 16px;
      vertical-align: middle;
      font-size: 14px;

      @media only screen and (min-width: 915px) {
        padding: 8px 16px;
      }
    }

    tbody {
      td,
      th {
        color: ${({ theme }) => theme.colors.secondaryBlue};
        font-size: 14px;
        display: flex;
        justify-content: space-between;
        text-align: left;
        align-items: center;

        @media only screen and (min-width: 915px) {
          display: table-cell;
        }

        @media only screen and (min-device-width: 768px) and (max-device-width: 915px) and (orientation: landscape) {
          display: flex;
        }
      }
    }

    tr:hover > td {
      background-color: #f9f9f9;
    }

    @media only screen and (min-width: 915px) {
      tr:hover > td {
        background-color: #f0f1f3;
      }
    }

    @media only screen and (min-device-width: 768px) and (max-device-width: 915px) and (orientation: landscape) {
      tr:hover > td {
        background-color: #f9f9f9;
      }
    }
  }

  .sticky-col {
    position: -webkit-sticky;
    position: sticky;
    background-color: white;
  }

  .user-icon {
    margin-right: 10px;
  }

  .wrapper-images {
    display: flex;
    text-align: left;
    align-items: center;
    justify-content: space-between;

    @media only screen and (min-width: 915px) {
      display: table-cell;
      text-align: center;
    }

    @media only screen and (min-device-width: 768px) and (max-device-width: 915px) and (orientation: landscape) {
      display: flex;
    }
  }

  .action-icon {
    cursor: pointer;
  }

  .action-icon:hover {
    svg {
      transform: scale(1.2);
      transition: 0.3s ease;
    }
  }

  .role {
    color: #f0f1f3;
    border-radius: 2px;
    width: fit-content;
    padding: 0px 4px;
    font-weight: 600;
    font-size: 14px;
    line-height: 24px;
  }
  .role.manager {
    background: #29578a;
  }
  .role.procurement {
    background: #617b8e;
  }
  .role.sales {
    background: #8ca6ba;
  }

  .pagination {
    display: flex;
    justify-content: center;
    margin-block: 20px;
    align-items: center;
    color: #395264;

    @media only screen and (min-width: 915px) {
      justify-content: right;
    }

    svg {
      cursor: pointer;
      width: 10px;
      height: 10px;
      margin: 0 5px;
    }

    svg:hover {
      path {
        stroke: red;
      }
    }

    .show-text {
      line-height: 16px;
      margin-right: 10px;
      font-size: 12px;
    }

    .page-number {
      line-height: 16px;
      margin: 0 10px;
      font-size: 14px;

      span {
        font-size: 20px;
        font-weight: 600;
      }
    }
  }
`
