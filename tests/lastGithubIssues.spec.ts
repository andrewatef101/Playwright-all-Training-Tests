import {test, expect} from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

const REPO = 'Last_Least';
const User = 'andrewatef101';   

test('create new Issue', async ({request}) => {

    const uniqueid = new Date().getTime();

    const CreateNewIssue = await request.post('https://api.github.com/repos/andrewatef101/Last_Least/issues', {
        headers:{
            'Accept': 'application/vnd.github+json',
            Authorization: `Bearer ${process.env.GITHUB_TOKEN}`
        } ,
        data: {
            "title": 'New Issue From Playwright API', 
            'body': 'This issue is nonsense and I hope its the last one'
        }
    });
    expect(CreateNewIssue.status()).toBe(201);

    const NewIssueResponse = await CreateNewIssue.json();
    console.log('New Issue Response Body: ' , NewIssueResponse);
    expect(NewIssueResponse.title).toBe('New Issue From Playwright API');

    const IssueNumber = NewIssueResponse.number;
    console.log(`New generated Issue Number is: ${IssueNumber}`);

    const VerifyCreation = await request.get(`https://api.github.com/repos/${User}/${REPO}/issues/${IssueNumber}`, {
        headers:{
            'Accept': 'application/vnd.github+json',
            Authorization: `Bearer ${process.env.GITHUB_TOKEN}`
        }
    });
    expect(VerifyCreation.status()).toBe(200);
    const VerfiyCreationResponse = await VerifyCreation.json();
    expect(VerfiyCreationResponse.title).toBe('New Issue From Playwright API');

    const IssueDelete = await request.patch(`https://api.github.com/repos/${User}/${REPO}/issues/${IssueNumber}`, {
        headers:{
            'Accept': 'application/vnd.github+json', 
            'Authorization': `Bearer ${process.env.GITHUB_TOKEN}`
        },
        data: {
            "state": 'closed'
        }
    });
    expect(IssueDelete.status()).toBe(200);
    console.log(`Issue with Number ${IssueNumber} has been closed successfully`);
});