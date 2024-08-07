import { execSync } from 'child_process';

execSync('npx nx run-many --target=build --all', { stdio: 'inherit' });
execSync('npx nx release --skip-publish', { stdio: 'inherit' });
const otp = getOtp();
console.log('OTP,', otp);
execSync(`npx nx release publish --otp=${otp}`, { stdio: 'inherit' });

function getOtp() {
    try {
        execSync(`which op`);
    } catch (e) {
        throw new Error(`Could not invoke OnePassword CLI.`);
    }

    try {
        return execSync(`eval $(op signin) && op item get Npmjs --otp`, {
            stdio: ['inherit', 'pipe', 'inherit'],
            encoding: 'utf-8',
        }).trim();
    } catch (e) {
        throw new Error(`Could not get one time password for npmjs: ` + e);
    }
}
