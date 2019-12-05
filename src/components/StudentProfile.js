import styled from 'styled-components';
import React from 'react';

import plusIcon from '../plus.svg';
import { TextField } from './TextField';

const ProfileContainer = styled.div`
    padding: 24px;
    border-bottom: 0.5px solid silver;
    display: flex;
`;

const ProfilePic = styled.img`
    border-radius: 50%;
    width: 128px;
    height: 128px;
    vertical-align: middle;
    border: 0.5px solid silver;
    margin-right: 32px;
`;

const ProfileDetails = styled.div`
    
`;

const Name = styled.h1`
    margin: 0 0 12px 0;
    text-align: left;
`;

const DetailsList = styled.ul`
    list-style-type:none;
    margin: 0 0 0 12px;
    padding: 0;
`;

const DetailsItem = styled.li`
    width: fit-content;
    margin-bottom: 4px;
    color: gray;
`;

const ExpandButton = styled.button`
    height: 64px;
    width: 64px;
    margin-left:auto;
    order: 2;
    border-radius: 50%;
`;

const Tags = styled.ul`
    list-style: none;
    margin: 0;
    overflow: hidden; 
    padding: 0;
`;

const Tag = styled.li`
    background: #eee;
    border-radius: 3px 0 0 3px;
    color: #999;
    height: 26px;
    line-height: 26px;
    padding: 0 20px 0 23px;
    margin-top: 4px;
    text-decoration: none;
`;

class StudentProfile extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            expand: false,
            newTag: ''
        }
    }
   
    toggleExpand() {
        this.setState({expand : !this.state.expand})
    }

    checkForTagEnter(e) {
        if(e.keyCode === 13) {
            this.setState({newTag : ''})
            this.props.addTag(this.state.newTag);
        }
    }
    
    updateTag(e) {
        this.setState({newTag: e.target.value});
    }

    generateExpandComponent(grades, tags) {
        return (
            <div style={{'marginTop': '12px'}}>
                {grades.map((grade, idx) => <DetailsItem key={idx}>Test {idx + 1}: {grade}% </DetailsItem>)}
                {tags ? <Tags>
                    {tags.map((tag, idx)=><Tag key={idx}>{tag}</Tag>)}
                </Tags> : null}
                <TextField 
                    width='fit-content' 
                    placeholder='Add a tag' 
                    type="text" 
                    id="add-tag-input"
                    className="add-tag-input"
                    value={this.state.newTag}
                    onChange={this.updateTag.bind(this)} 
                    onKeyDown={this.checkForTagEnter.bind(this)}/>
            </div>
        )
    }

    render() {
        const {pic, company, email, skill, firstName, lastName, grades, tags} = this.props.student;
        const avg = grades.reduce((a,b) => parseInt(a)+parseInt(b), 0) / grades.length;

        return (
            <div>
                <ProfileContainer>
                <ProfilePic src={pic} alt='student profile image'/>
                <ProfileDetails>
                    <Name>{firstName} {lastName}</Name>
                    <DetailsList>
                        <DetailsItem>Email: {email} </DetailsItem>
                        <DetailsItem>Company: {company} </DetailsItem>
                        <DetailsItem>Skill: {skill} </DetailsItem>
                        <DetailsItem>Average: {avg}% </DetailsItem>
                        {this.state.expand ? this.generateExpandComponent(grades, tags) : null}
                    </DetailsList>
                </ProfileDetails>
                <ExpandButton className='expand-btn' onClick={this.toggleExpand.bind(this)}><img src={plusIcon} alt='expand button'/></ExpandButton>
                </ProfileContainer>
            </div>
            
        );
    }  
}

export default StudentProfile;