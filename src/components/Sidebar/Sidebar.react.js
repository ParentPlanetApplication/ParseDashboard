/*
 * Copyright (c) 2016-present, Parse, LLC
 * All rights reserved.
 *
 * This source code is licensed under the license found in the LICENSE file in
 * the root directory of this source tree.
 */
import AppsManager    from 'lib/AppsManager';
import AppsSelector   from 'components/Sidebar/AppsSelector.react';
import FooterMenu     from 'components/Sidebar/FooterMenu.react';
import React          from 'react';
import SidebarHeader  from 'components/Sidebar/SidebarHeader.react';
import SidebarSection from 'components/Sidebar/SidebarSection.react';
import SidebarSubItem from 'components/Sidebar/SidebarSubItem.react';
import styles         from 'components/Sidebar/Sidebar.scss';
import ParseApp           from 'lib/ParseApp';

let host = window.location.host;
//alert(host);
const Sidebar = ({
  prefix,
  action,
  actionHandler,
  children,
  subsection,
  sections,
  section,
  appSelector,
}) => {
  const _subMenu = subsections => {
    if (!subsections) {
      return null;
    }
    return (
      <div className={styles.submenu}>
        {subsections.map(({name, link}) => {
          const active = subsection === name;
          return (
            <SidebarSubItem
              key={name}
              name={name}
              link={prefix + link}
              action={action || null}
              actionHandler={active ? actionHandler : null}
              active={active}>
              {active ? children : null}
            </SidebarSubItem>
          );
        })}
      </div>
    );
  }

  const apps = [].concat(AppsManager.apps()).sort((a, b) => (a.name < b.name ? -1 : (a.name > b.name ? 1 : 0)));
   var LogoutRender = React.createClass({
    render: function() {
    return (<a onClick={Logout}>Logout<span className={styles.emoji}></span></a>);
    }
  });
  var LoginRender = React.createClass({
    render: function() {
    return (<a onClick={Login}>Login<span className={styles.emoji}></span></a>);
    }
  });
  function Login(){
    //alert(host);
     window.location.href = "https://" + host +"/apps";//localhost:4040/apps";
  }
 function Logout(){
    /*var p = window.location.protocol + '//'
  // current location must return 200 OK for this GET
    window.location = window.location.href.replace(p, p + 'logout:password@');
     window.location.href="/";*/
     var isOpera = !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
    // Opera 8.0+ (UA detection to detect Blink/v8-powered Opera)
var isFirefox = typeof InstallTrigger !== 'undefined';   // Firefox 1.0+
var isSafari = navigator.userAgent.toLowerCase().indexOf('safari/') > -1;//Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;
    // At least Safari 3+: "[object HTMLElementConstructor]"
var isChrome = !navigator.userAgent.toLowerCase().indexOf('chrome/') > -1;              // Chrome 1+
var isIE = /*@cc_on!@*/false || !!document.documentMode; // At least IE6
var Host = window.location.host;

//alert(isSafari);
//Clear Basic Realm Authentication
if(isIE){
//IE
    document.execCommand("ClearAuthenticationCache");
    window.location = '/';
}
else if(isSafari && !isChrome)
{//Safari. but this works mostly on all browser except chrome
    (function(safeLocation){
        var outcome, u, m = "You should be logged out now.";
        // IE has a simple solution for it - API:
        try { outcome = document.execCommand("ClearAuthenticationCache") }catch(e){}
        // Other browsers need a larger solution - AJAX call with special user name - 'logout'.
        if (!outcome) {
            // Let's create an xmlhttp object
            outcome = (function(x){
                if (x) {
                    // the reason we use "random" value for password is 
                    // that browsers cache requests. changing
                    // password effectively behaves like cache-busing.
                    x.open("HEAD", safeLocation || location.href, true, "logout", (new Date()).getTime().toString())
                    x.send("");
                    // x.abort()
                    return 1 // this is speculative "We are done." 
                } else {
                    return
                }
            })(window.XMLHttpRequest ? new window.XMLHttpRequest() : ( window.ActiveXObject ? new ActiveXObject("Microsoft.XMLHTTP") : u )) 
        }
        if (!outcome) {
            m = "Your browser is too old or too weird to support log out functionality. Close all windows and restart the browser."
        }
        //alert(m);
        window.location = '/apps';
        // return !!outcome
    })(/*if present URI does not return 200 OK for GET, set some other 200 OK location here*/)
    //alert("a");
   // var p = window.location.protocol + '//';
//alert(host);
    //window.location = window.location.href.replace(p, p + 'logout:password@');//'https://log:out@'+Host+'/';
}
else{
//Firefox,Chrome
var p = window.location.protocol + '//';
//alert(host);
    window.location = window.location.href.replace(p, p + 'logout:password@');//'https://log:out@'+Host+'/';
   
}
  
  } 
  return <div className={styles.sidebar}>
    <SidebarHeader />
    {appSelector ? <AppsSelector apps={apps} /> : null}

    <div className={styles.content}>
      {sections.map(({
        name,
        icon,
        style,
        link,
        subsections,
      }) => {
        const active = name === section;
        return (
          <SidebarSection
            key={name}
            name={name}
            icon={icon}
            style={style}
            link={prefix + link}
            active={active}>
            {active ? _subMenu(subsections) : null}
          </SidebarSection>
        );
      })}
    </div>
    
    <div className={styles.footer}>
      {
              apps.length === 0? <LoginRender />:<LogoutRender/>
            }
    {/* <a target='_blank' href='https://parseplatform.github.io'>Open Source</a>
      <a target='_blank' href='https://www.parse.com/docs'>Docs</a>
      <a target='_blank' href='https://www.parse.com/downloads'>Downloads</a>
      <FooterMenu />*/}
    </div>
  </div>
}

Sidebar.contextTypes = {
  generatePath: React.PropTypes.func
};

export default Sidebar;
