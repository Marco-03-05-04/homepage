import React, { Component } from 'react'
import { Link } from "gatsby"


import Layout from '../../components/layout'
import Button from '../../components/Button/Button'


import './Index.scss'

import ServicesButtons from './ServicesButtons/ServicesButtons'
import WebApplications from './topics/WebApplications';
import WebPlatforms from './topics/WebPlatforms';
import ICTTraining from './topics/ICTTraining';
import CompetenceAudits from './topics/CompetenceAudits';
import IndividualDevelopment from './topics/IndividualDevelopment';
import ManagementDevelopment from './topics/ManagementDevelopment';
import HexagonChart from '../../components/HexagonChart/HexagonChart';

import tsLogo from '../../images/ts-logo.png'

const windowGlobal = typeof window !== 'undefined' && window
const MOBILE_BREAKPOINT = 900;

class IndexPage extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      topic: null,
      leftPanelShown: false,
      rightPanelShown: false,
    }

    this.buttonsRefs = {
      'ict-training' : React.createRef(),
      'expertise-audits' : React.createRef(),
      'individual-development' : React.createRef(),
      'management-development' : React.createRef(),
      'web-applications' : React.createRef(),
      'web-platforms' : React.createRef()
    }
    
    
    this.handleHexagonClick = this.handleHexagonClick.bind(this);
    this.handleQuickLinkClick = this.handleQuickLinkClick.bind(this);
  }

  handleQuickLinkClick(id) {
    // TODO: polyfill for safari
    this.buttonsRefs[id].current.scrollIntoView({
      behavior: 'smooth'
    })
  }

  handleHexagonClick(topic, side) {
    if (topic === null) {
      this.setState({ 
        leftPanelShown: false,
        rightPanelShown: false
      });


      setTimeout(() => {
        this.setState({ 
          topic: null
        });
      }, 400);

      return;
    }
    
    if (this.state.topic === topic) {
      setTimeout(() => {
        this.setState({ 
          topic: null
        });
      }, 400);

      if (side === 'left') {
        return this.setState({
          leftPanelShown: !this.state.leftPanelShown,
        })
      } else {
        return this.setState({
          rightPanelShown: !this.state.rightPanelShown,
        })
      }
    }

    if (side === 'left') {
      this.setState({ 
        topic: topic,
        leftPanelShown: true,
        rightPanelShown: false
      });
    } else {
      this.setState({ 
        topic: topic,
        leftPanelShown: false,
        rightPanelShown: true,
      });
    }
  }
  
  
  render() {
    let hexagonsClassName = 'sliding-container '; 

    if (this.state.leftPanelShown) {
      hexagonsClassName += 'shift-left'
    } else if (this.state.rightPanelShown) {
      hexagonsClassName += 'shift-right'
    }

    const rightPanelClassName = `right-panel ${this.state.rightPanelShown? 'shown' : ''}`;
    const leftPanelClassName = `left-panel ${this.state.leftPanelShown? 'shown' : ''}`;

    let topicElement = null;

    switch (this.state.topic) {
      case 'PIATTAFORME_WEB': topicElement = (
        <WebPlatforms />
      );  
        break;      
      case 'APPLICAZIONI_WEB': topicElement = (
        <WebApplications />
      );    
        break;    
      case 'TRAINING_ICT': topicElement = (
        <ICTTraining />
      );     
        break;   
      case 'AUDIT_COMPETENZE': topicElement = (
        <CompetenceAudits />
      );    
        break;    
      case 'SVILUPPO_INDIVIDUALE': topicElement = (
        <IndividualDevelopment />
      );  
        break;      
      case 'SVILUPPO_ORGANIZZATIVO': topicElement = (
        <ManagementDevelopment />
      );        
        break;
      default: break;
    }

    let leftPanelContent = topicElement;
    let rightPanelContent = topicElement;

    if (windowGlobal.innerWidth <= MOBILE_BREAKPOINT) {
      return (
        <div className="index-page">
          <Layout>
            <img className="ts-logo" src={ tsLogo } alt="Top Solution s.r.l."/>
            <ServicesButtons onClick={ this.handleQuickLinkClick } />
            <div ref={ this.buttonsRefs['web-platforms'] }>
              <WebPlatforms mobile accent="purple"/>
            </div>
            <div ref={ this.buttonsRefs['web-applications'] }>
              <WebApplications mobile accent="purple"/>
            </div>
            <div ref={ this.buttonsRefs['ict-training'] }>
              <ICTTraining mobile accent="purple"/>
            </div>
            <div ref={ this.buttonsRefs['expertise-audits'] }>
              <CompetenceAudits mobile accent="cyan"/>
            </div>
            <div ref={ this.buttonsRefs['individual-development'] }>
              <IndividualDevelopment mobile accent="cyan"/>
            </div>
            <div ref={ this.buttonsRefs['management-development'] }>
              <ManagementDevelopment mobile accent="cyan"/>
            </div>
          </Layout>
        </div>
      )      
    }


    return (
      <div className="index-page">
        <Layout>
          <div className={ hexagonsClassName }>
            <div className={ leftPanelClassName }>
              { leftPanelContent }
            </div>
            <div className="sliding">
              <HexagonChart onHexagonClick={ this.handleHexagonClick } highlighted={ this.state.topic }/>
            </div>
            <div className={ rightPanelClassName }>
              { rightPanelContent }
            </div>
          </div>
        </Layout>
      </div>
    )
  }
}


export default IndexPage
