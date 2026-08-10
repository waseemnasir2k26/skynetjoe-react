/**
 * Video Skills — the SkynetLabs Claude Code video-editing playbook.
 *
 * Each record is one editing skill we ship: what it makes, what you feed it,
 * the proof it's real, and the FULL master prompt a visitor can paste into
 * Claude Code (or any LLM) to reproduce the edit.
 *
 * Data lives in video-skills.json so the ffmpeg/ASS syntax inside each master
 * prompt survives verbatim (no template-literal escape mangling).
 */

import data from "./video-skills.json";

export type VideoSkill = {
  /** kebab-case skill id, matches the SkynetLabs skill folder. */
  slug: string;
  /** Punchy card title. */
  title: string;
  /** Short pill label (e.g. "9:16 reel", "captions"). */
  tag: string;
  /** One sentence: the output you get. */
  whatItMakes: string;
  /** One line: what you must supply. */
  inputs: string;
  /** One line: real shipped proof. */
  proof: string;
  /** The full copy-paste master prompt (locked behind the email gate). */
  masterPrompt: string;
};

export const VIDEO_SKILLS: VideoSkill[] = data as VideoSkill[];

export const VIDEO_SKILL_COUNT = VIDEO_SKILLS.length;
