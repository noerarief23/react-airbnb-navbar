import React from 'react'
import { connect } from 'react-redux'
import styled, { css } from 'styled-components'
import 'isomorphic-fetch'
import Page from '../components/HOC/Page'
import Table from '../components/Table'
import ExpandRenderer from '../components/Table/ExpandRenderer'
import { fetchData } from '../data'
// import Collapse, { Panel } from '../components/Collapsible'
// import Collapse, { Panel } from 'rc-collapse'

const icon = css`
  display: inline-block;
  font: normal normal normal 14px/1 FontAwesome;
  font-size: inherit;
  text-rendering: auto;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
`

const paperPlane = css`
  ${icon}
  content: '\f1d8';
`

const plus = css`
  ${icon}
  content: '\f067';
`

const trash = css`
  ${icon}
  content: '\f1f8';
`

const exclamation = css`
  ${icon}
  content: '\f06a';
`

const btn = (light, dark) => css`
white-space: nowrap;
display: inline-block;
border-radius: 5px;
padding: 5px 10px;
font-size: 16px;
color: white;
&:visited {
  color: white;
}
background-image: linear-gradient(${light}, ${dark});
border: 1px solid ${dark};
&:hover {
  background-image: linear-gradient(${light}, ${dark});
  &[disabled] {
    background-image: linear-gradient(${light}, ${dark});
  }
}
&:visited {
  color: black;
}
&[disabled] {
  opacity: 0.6;
  cursor: not-allowed;
}
`

const btnDefault = css`
${btn('#ffffff', '#d5d5d5')}
color: #555;
`
const btnPrimary = btn('#4f93ce', '#285f8f')

var exampleCols = [
  { "Name": "Changelist / Build", "DataName": "changelist" },
  { "Name": "Owner", "DataName": "owner" },
  { "Name": "Time Started", "DataName": "time_started" },
  { "Name": "State", "DataName": "state" },
  { "Name": "Metrics", "DataName": "metrics" },
  { "Name": "Build", "DataName": "build" },
  { "Name": "Unit Test", "DataName": "unit_test" },
  { "Name": "Functional Test", "DataName": "func_test" },
];

const Test = (props) => {
  return (
    <div>
      <Table
        cols={exampleCols}
        rows={props.data}
        expandRenderComponent={ExpandRenderer}
      />
    </div>
  )
}

Test.getInitialProps = async ({ req, store }) => {
  console.log(store.getState())
  // const res = await fetch('http://pokeapi.salestock.net/api/v2/pokemon/')
  const res = await fetchData()
  // const json = await res.json()
  return { data: res }
}

const mapStateToProps = state => ({
  fullName: state.auth.fullName
})
const mapDispatchToProps = {

}

export default Page(connect(mapStateToProps, mapDispatchToProps)(Test))