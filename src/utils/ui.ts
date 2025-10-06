import * as p from '@clack/prompts';
import pc from 'picocolors';

export const ui = {
  intro: (message: string) => {
    console.log('');
    p.intro(pc.bgMagenta(pc.white(` ⚡ ${message} `)));
  },
  
  outro: (message: string) => {
    p.outro(pc.green(`✨ ${message}`));
    console.log('');
  },
  
  success: (message: string) => {
    console.log(pc.green('✓'), pc.green(message));
  },
  
  error: (message: string) => {
    console.log(pc.red('✗'), pc.red(message));
  },
  
  info: (message: string) => {
    console.log(pc.blue('ℹ'), pc.blue(message));
  },
  
  warning: (message: string) => {
    console.log(pc.yellow('⚠'), pc.yellow(message));
  },
  
  step: (step: number, total: number, message: string) => {
    const progress = `${step}/${total}`;
    console.log(pc.gray(`[${progress}]`), pc.white(message));
  },
  
  confetti: () => {
    console.log('\n' + pc.magenta('🎉') + ' ' + pc.cyan('✨') + ' ' + pc.yellow('🚀') + ' ' + pc.green('✨') + ' ' + pc.magenta('🎉') + '\n');
  },
  
  bigConfetti: () => {
    console.log('');
    console.log(pc.magenta('    🎉 ✨ 🚀 ✨ 🎉'));
    console.log(pc.cyan('  ✨ 🎊 🌟 🎊 ✨'));
    console.log(pc.yellow('🚀 🌟 🎉 🌟 🚀'));
    console.log(pc.green('  ✨ 🎊 🌟 🎊 ✨'));
    console.log(pc.magenta('    🎉 ✨ 🚀 ✨ 🎉'));
    console.log('');
  },
  
  badge: (text: string) => {
    return pc.bgMagenta(pc.white(` ${text} `));
  },
  
  successBadge: (text: string) => {
    return pc.bgGreen(pc.white(` ${text} `));
  },
  
  warningBadge: (text: string) => {
    return pc.bgYellow(pc.black(` ${text} `));
  },
  
  link: (url: string) => {
    return pc.cyan(pc.underline(url));
  },
  
  code: (text: string) => {
    return pc.inverse(pc.gray(` ${text} `));
  },
  
  command: (text: string) => {
    return pc.bgBlue(pc.white(` $ ${text} `));
  },
  
  spinner: () => p.spinner(),
  
  select: p.select,
  text: p.text,
  confirm: p.confirm,
  multiselect: p.multiselect,
  
  box: (title: string, content: string[]) => {
    const maxContentLength = Math.max(...content.map(line => line.length));
    const titleLength = title.length;
    const width = Math.max(maxContentLength + 4, titleLength + 4, 50);
    const border = '─'.repeat(width - 2);
    
    console.log('');
    console.log(pc.cyan(`┌${border}┐`));
    console.log(pc.cyan('│') + pc.bold(pc.white(` ${title}`)).padEnd(width + 8) + pc.cyan('│'));
    console.log(pc.cyan(`├${border}┤`));
    content.forEach(line => {
      if (line === '') {
        console.log(pc.cyan('│') + ' '.repeat(width - 1) + pc.cyan('│'));
      } else {
        console.log(pc.cyan('│') + ` ${line}`.padEnd(width - 1) + pc.cyan('│'));
      }
    });
    console.log(pc.cyan(`└${border}┘`));
    console.log('');
  },
  
  banner: () => {
    console.log('');
    console.log(pc.magenta('  ⚡ CreateForge'));
    console.log(pc.gray('  Ship full-stack apps, not scaffolds'));
    console.log('');
  },
  
  divider: () => {
    console.log(pc.gray('─'.repeat(60)));
  },
  
  spacer: () => {
    console.log('');
  },
  
  highlight: (text: string) => {
    return pc.bgCyan(pc.black(` ${text} `));
  },
  
  dim: (text: string) => {
    return pc.gray(text);
  },
  
  bold: (text: string) => {
    return pc.bold(text);
  },
  
  gradient: (text: string) => {
    // Simple gradient effect using different colors
    const chars = text.split('');
    const colors = [pc.magenta, pc.blue, pc.cyan, pc.green];
    return chars.map((char, i) => colors[i % colors.length](char)).join('');
  },
  
  progressBar: (current: number, total: number, width: number = 30) => {
    const percentage = Math.round((current / total) * 100);
    const filled = Math.round((current / total) * width);
    const empty = width - filled;
    
    const bar = pc.green('█'.repeat(filled)) + pc.gray('░'.repeat(empty));
    return `${bar} ${percentage}%`;
  },
  
  table: (headers: string[], rows: string[][]) => {
    const colWidths = headers.map((header, i) => 
      Math.max(header.length, ...rows.map(row => row[i]?.length || 0)) + 2
    );
    
    // Header
    console.log('');
    const headerRow = headers.map((header, i) => 
      pc.bold(header.padEnd(colWidths[i]))
    ).join('│');
    console.log(`│${headerRow}│`);
    
    // Separator
    const separator = colWidths.map(width => '─'.repeat(width)).join('┼');
    console.log(`├${separator}┤`);
    
    // Rows
    rows.forEach(row => {
      const rowStr = row.map((cell, i) => 
        (cell || '').padEnd(colWidths[i])
      ).join('│');
      console.log(`│${rowStr}│`);
    });
    console.log('');
  }
};
