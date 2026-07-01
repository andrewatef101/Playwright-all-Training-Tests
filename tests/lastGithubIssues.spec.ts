import {test, expect} from '@playwright/test';

// provide minimal declaration so TypeScript knows about process.env in this test file
declare const process: { env: { GITHUB_TOKEN?: string } };


const REPO = 'Last_Least';
const User = 'andrewatef101';   

test('create new Issue', async ({request}) => {

    const uniqueId = new Date().getTime();
    const issueTitle = `New Issue From Playwright API ${uniqueId}`;
    const issueBody = `This issue is nonsense and I hope its the last one ${uniqueId}`;

    const CreateNewIssue = await request.post('https://api.github.com/repos/andrewatef101/Last_Least/issues', {
        headers:{
            'Accept': 'application/vnd.github+json',
            Authorization: `Bearer ${process.env.GITHUB_TOKEN}`
        } ,
        data: {
            title: issueTitle,
            body: issueBody
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