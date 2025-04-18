'use client';

import React , { useState } from 'react';
import dynamic from 'next/dynamic';
import { useTranslations } from 'next-intl';
import useControls from '@/hooks/useControls';
import LanguageSwitcher from '@/components/language/switcher';

const RaceTrack = dynamic(() => import('@/components/game/RaceTrack'), { ssr: false });
const Car = dynamic(() => import('@/components/game/Car'), { ssr: false });
const Timer = dynamic(() => import('@/components/game/Timer'), { ssr: false });
const GameResult = dynamic(() => import('@/app/game/gameResult'), { ssr: false });
