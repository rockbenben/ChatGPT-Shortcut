---
sidebar_label: আপনার Fork সিঙ্কে রাখুন
title: AI Short সিঙ্ক আপডেট | Fork স্বয়ংক্রিয়ভাবে আপস্ট্রিম অনুসরণ করে
description: আপনার AI Short fork কে স্বয়ংক্রিয়ভাবে আপস্ট্রিম আপডেটের সাথে রাখুন — Vercel ডিপ্লয়মেন্টে আপডেট প্রম্পট না দেখানোর সমস্যা সমাধান করুন, GitHub Actions স্বয়ংক্রিয় সিঙ্ক চালু করুন।
---

# আপনার Fork সিঙ্কে রাখুন

এক ক্লিকের Vercel ডিপ্লয়মেন্ট সবসময় "আপডেট উপলব্ধ" প্রম্পট দেখাতে পারে — কারণ Vercel Fork করার পরিবর্তে একটি নতুন প্রজেক্ট তৈরি করে, তাই এটি আপস্ট্রিম আপডেট শনাক্ত করতে পারে না। এটি ঠিক করতে:

1. মূল রিপোজিটরিটি মুছুন
2. পৃষ্ঠার উপরের ডান দিকে **Fork** বাটন ব্যবহার করে এই প্রজেক্টটি Fork করুন
3. [Vercel নতুন-প্রজেক্ট পেজে](https://vercel.com/new), Import Git Repository-এর অধীনে আপনার Fork করা রিপোজিটরি পুনরায় ইম্পোর্ট করুন এবং ডিপ্লয় করুন

## স্বয়ংক্রিয় আপডেট চালু করুন

> যদি আপনি Upstream Sync ত্রুটির সম্মুখীন হন, একবার ম্যানুয়ালি Sync Fork চালান!

Fork করার পরে, Actions পেজে Workflows ম্যানুয়ালি চালু করুন এবং Upstream Sync action একবার চালান। একবার চালু হলে, প্রজেক্টটি প্রতিদিন স্বয়ংক্রিয়ভাবে সিঙ্ক হয়:

![Auto-update](https://img.newzone.top/2023-05-19-11-57-59.png?imageMogr2/format/webp)

![Enable auto-update](https://img.newzone.top/2023-05-19-11-59-26.png?imageMogr2/format/webp)

## ম্যানুয়াল আপডেট

হাতে এখনই আপডেট করতে চান? [GitHub fork-syncing ডকস](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/syncing-a-fork) দেখুন।

আপনি নতুন ফিচারের বিজ্ঞপ্তি পেতে এই প্রজেক্টটি star / watch করতে পারেন।
