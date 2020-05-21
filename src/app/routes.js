import React, { Component, Suspense, lazy } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import styled from 'styled-components'

import Storage from '@/utils/storage'
import Loading from '@/components/loading'
import Page from '@/components/page'
import Header from './header'
import SideBar from './side-bar'

const Login = lazy(() => import('@/pages/account/login'))
const Home = lazy(() => import('@/pages/home'))
const Settings = lazy(() => import('@/pages/settings'))
const StudentInformation = lazy(() => import('@/pages/StudentInformation'))
const ExamSchedule = lazy(() => import('@/pages/ExamSchedule'))
const ManageRoomExam = lazy(() => import('@/pages/ManageRoomExam'))
const HistoryExam = lazy(() => import('@/pages/HistoryExam'))
const TestManage = lazy(() => import('@/pages/TestManage'))
const NewUser = lazy(() => import('@/pages/NewUser'))
const ListUser = lazy(() => import('@/pages/ListUser'))
const ListTest = lazy(() => import('@/pages/ListTest'))
const NewTest = lazy(() => import('@/pages/NewTest'))
const EditTest = lazy(() => import('@/pages/EditTest'))
const WatchTest = lazy(() => import('@/pages/WatchTest'))
const Exam = lazy(() => import('@/pages/Exam'))
const CreateExam = lazy(() => import('@/pages/CreateExam'))
const ListExam = lazy(() => import('@/pages/ListExam'))
const EditExam = lazy(() => import('@/pages/EditExam'))
const RoomExam = lazy(() => import('@/pages/RoomExam'))
const CheckExam = lazy(() => import('@/pages/CheckExam'))
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
            <Route exact path="/exam-schedule" component={this._renderLazyComponent(ExamSchedule)} />
            <Route exact path="/manage-room" component={this._renderLazyComponent(ManageRoomExam)} />
            <Route exact path="/history-exam" component={this._renderLazyComponent(HistoryExam)} />
            <Route exact path="/test-manage" component={this._renderLazyComponent(TestManage)} />
            <Route exact path="/new-user" component={this._renderLazyComponent(NewUser)} />
            <Route exact path="/list-user" component={this._renderLazyComponent(ListUser)} />
            <Route exact path="/list-test" component={this._renderLazyComponent(ListTest)} />
            <Route exact path="/new-test" component={this._renderLazyComponent(NewTest)} />
            <Route exact path="/exam/:idExam/:idTest" component={this._renderLazyComponent(Exam)} />
            <Route exact path="/edit-test/:idTest" component={this._renderLazyComponent(EditTest)} />
            <Route exact path="/create-exam" component={this._renderLazyComponent(CreateExam)} />
            <Route exact path="/list-exam" component={this._renderLazyComponent(ListExam)} />
            <Route exact path="/edit-exam" component={this._renderLazyComponent(EditExam)} />
            <Route exact path="/watch-test/:id" component={this._renderLazyComponent(WatchTest)} />
            <Route exact path="/room-exam" component={this._renderLazyComponent(RoomExam)} />
            <Route exact path="/check-exam" component={this._renderLazyComponent(CheckExam)} />
            
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
