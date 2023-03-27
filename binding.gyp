{
  'includes': ['dependencies/common.gypi'],
  'targets': [
    {
      'target_name': 'better_sqlite3',
      'dependencies': ['dependencies/sqlite3.gyp:sqlite3'],
      'sources': ['dependencies/better_sqlite3/better_sqlite3.cpp'],
      'cflags_cc': ['-std=c++17'],
      'xcode_settings': {
        'OTHER_CPLUSPLUSFLAGS': ['-std=c++17', '-stdlib=libc++'],
      },
      'msvs_settings': {
        'VCCLCompilerTool': {
          'AdditionalOptions': [
            '/std:c++17',
          ],
        },
      },
      'conditions': [
        ['OS=="linux"', {
          'ldflags': [
            '-Wl,-Bsymbolic',
            '-Wl,--exclude-libs,ALL',
          ],
        }],
      ],
    }
  ],
}
