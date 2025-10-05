import * as p from '@clack/prompts';
import pc from 'picocolors';

export const ui = {
  intro: (message: string) => p.intro(pc.bgCyan(pc.black(` ${message} `))),
  outro: (message: string) => p.outro(pc.green(message)),
  
  success: (message: string) => {
    console.log(pc.green('✓'), message);
  },
  
  error: (message: string) => {
    console.log(pc.red('✗'), message);
  },
  
  info: (message: string) => {
    console.log(pc.blue('ℹ'), message);
  },
  
  warning: (message: string) => {
    console.log(pc.yellow('⚠'), message);
  },
  
  confetti: () => {
    console.log('\n' + '🎉 ✨ 🚀 ✨ 🎉' + '\n');
  },
  
  badge: (text: string) => {
    return pc.bgMagenta(pc.white(` ${text} `));
  },
  
  link: (url: string) => {
    return pc.cyan(pc.underline(url));
  },
  
  code: (text: string) => {
    return pc.gray(pc.white(` ${text} `));
  },
  
  spinner: () => p.spinner(),
  
  select: p.select,
  text: p.text,
  confirm: p.confirm,
  multiselect: p.multiselect,
  
  box: (title: string, content: string[]) => {
    const width = 60;
    const border = '─'.repeat(width - 2);
    console.log(pc.cyan(`┌${border}┐`));
    console.log(pc.cyan('│') + pc.bold(` ${title}`.padEnd(width - 1)) + pc.cyan('│'));
    console.log(pc.cyan(`├${border}┤`));
    content.forEach(line => {
      console.log(pc.cyan('│') + ` ${line}`.padEnd(width - 1) + pc.cyan('│'));
    });
    console.log(pc.cyan(`└${border}┘`));
  }
};
