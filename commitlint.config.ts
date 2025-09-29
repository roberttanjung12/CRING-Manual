import { RuleConfigSeverity, type UserConfig } from '@commitlint/types';

const Configuration: UserConfig = {
  extends: ['@commitlint/config-conventional'],
  formatter: '@commitlint/format',
  rules: {
    'type-enum': [RuleConfigSeverity.Error, 'always', ['chore', 'docs', `style`, 'feat', 'fix', 'refactor', 'test']],
    'subject-case': [RuleConfigSeverity.Error, 'always', ['sentence-case']],
    'scope-enum': [RuleConfigSeverity.Error, 'always', ['ui', 'api', '']]
  }
};

export default Configuration;
