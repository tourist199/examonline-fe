import React, { Component, Suspense, lazy } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import styled from 'styled-components'

import Storage from '@/utils/storage'
import Loading from '@/components/loading'
import Page from '@/components/page'
import Header from './header'
import SideBar from './side-bar'

const Intro = lazy(() => import('@/pages/Intro'))
const Login = lazy(() => import('@/pages/account/login'))
const Home = lazy(() => import('@/pages/home'))
const Settings = lazy(() => import('@/pages/settings'))
const StudentInformation = lazy(() => import('@/pages/StudentInformation'))
const TestSchedule = lazy(() => import('@/pages/TestSchedule'))
const HistoryExam = lazy(() => import('@/pages/HistoryExam'))
const TestManage = lazy(() => import('@/pages/TestManage'))
const NewUser = lazy(() => import('@/pages/NewUser'))
const ListUser = lazy(() => import('@/pages/ListUser'))
const ListTest = lazy(() => import('@/pages/ListTest'))
const NewTest = lazy(() => import('@/pages/NewTest'))
const CreateExam = lazy(() => import('@/pages/CreateExam'))
const ListExam = lazy(() => import('@/pages/ListExam'))
const NotFound = lazy(() => import('@/pages/not-found'))

const VerticalBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`

const HorizontalBox = styled.div`
  flex: 1;
  display: flex;
  min-height: 0;
`

const PrivateRoute = ({ condition, redirect, ...props }) => {
  condition = condition()

  if (condition) return <Route {...props} />
  return <Redirect to={redirect} />
}

class Routes extends Component {
  _renderLazyComponent = (LazyComponent, params) => (props) => <LazyComponent {...props} {...params} />

  _renderAuthRoutes = () => (
    <>
      <Header />
      <HorizontalBox>
        <SideBar />
        <Suspense fallback={<Page sidebar><Loading /></Page>}>
          <Switch>
            <Route exact path="/" component={this._renderLazyComponent(Home)} />
            <Route exact path="/settings" component={this._renderLazyComponent(Settings)} />
            <Route exact path="/student-information" component={this._renderLazyComponent(StudentInformation)} />
            <Route exact path="/test-schedule" component={this._renderLazyComponent(TestSchedule)} />
            <Route exact path="/history-exam" component={this._renderLazyComponent(HistoryExam)} />
            <Route exact path="/test-manage" component={this._renderLazyComponent(TestManage)} />
            <Route exact path="/new-user" component={this._renderLazyComponent(NewUser)} />
            <Route exact path="/list-user" component={this._renderLazyComponent(ListUser)} />
            <Route exact path="/list-test" component={this._renderLazyComponent(ListTest)} />
            <Route exact path="/new-test" component={this._renderLazyComponent(NewTest)} />
            <Route exact path="/create-exam" component={this._renderLazyComponent(CreateExam)} />
            <Route exact path="/list-exam" component={this._renderLazyComponent(ListExam)} />

            <Redirect to="/not-found" />
          </Switch>
        </Suspense>
      </HorizontalBox>
    </>
  )

  render() {
    return (
      <VerticalBox>
        <Suspense fallback={<Page><Loading /></Page>}>
          <Switch>
            <Route path="/login" component={this._renderLazyComponent(Login)} />
            <Route path="/not-found" component={this._renderLazyComponent(NotFound)} />
            <Route path="/intro" component={this._renderLazyComponent(Intro)} />
            <PrivateRoute
              condition={() => Storage.has('ACCESS_TOKEN')}
              redirect="/login"
              path="/"
              component={this._renderAuthRoutes}
            />
          </Switch>
        </Suspense>
      </VerticalBox>
    )
  }
}

export default Routes
